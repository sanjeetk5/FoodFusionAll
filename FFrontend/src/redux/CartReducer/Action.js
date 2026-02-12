// actions.js
import {
  CART_REQ,
  CART_SUCCESS,
  CART_FAILED,
  CART_SET,
  CART_CLEAR,
} from "./ActionTypes";

/**
 * Helper: derive per-user cart key from token
 * token could be stored in Redux or localStorage; we prefer Redux token if provided
 */
const getToken = (maybeToken) => {
  if (maybeToken) return maybeToken;
  try {
    return localStorage.getItem("token") || "";
  } catch (e) {
    return "";
  }
};

const cartKeyForToken = (token) => {
  if (!token) return "cart_guest"; // fallback guest cart key
  // sanitize token (avoid super long keys): use a short hash if you want, but fine to use token substring
  const short = token.length > 16 ? token.slice(0, 16) : token;
  return `cart_${short}`;
};

/**
 * loadCartForCurrentToken - thunk
 * Loads cart from localStorage for the current token and sets Redux cart
 * Accepts optional token parameter (if you prefer to pass redux token)
 */
export const loadCartForToken = (token) => (dispatch) => {
  dispatch({ type: CART_REQ });
  try {
    const t = getToken(token);
    const key = cartKeyForToken(t);
    const raw = localStorage.getItem(key);
    const items = raw ? JSON.parse(raw) : [];
    dispatch({ type: CART_SUCCESS, payload: items });
    return items;
  } catch (err) {
    dispatch({ type: CART_FAILED, payload: err?.message || err });
    throw err;
  }
};

/**
 * persistCartForToken - helper (not exported thunk)
 * Writes items array to localStorage under per-user key.
 */
const persistCartForToken = (items, token) => {
  try {
    const t = getToken(token);
    const key = cartKeyForToken(t);
    localStorage.setItem(key, JSON.stringify(items));
  } catch (e) {
    console.warn("persistCartForToken error", e);
  }
};

/**
 * setCart - directly set cart items in redux and persist for token
 * Use when loading or replacing entire cart
 */
export const setCart = (items, token) => (dispatch) => {
  try {
    persistCartForToken(items, token);
    dispatch({ type: CART_SET, payload: items });
  } catch (err) {
    dispatch({ type: CART_FAILED, payload: err?.message || err });
  }
};

/**
 * addItemToCart - item = { id, name, price, ... } (qty optional)
 * If item exists -> increments qty, otherwise push with qty=1
 * This updates Redux and persists to localStorage for current token.
 */
export const addItemToCart = (item, token) => (dispatch, getState) => {
  dispatch({ type: CART_REQ });
  try {
    const current = getState().cartReducer.items || [];
    const t = getToken(token || getState().LoginReducer?.token);
    // find by id
    const idx = current.findIndex((it) => it.id === item.id);
    let next;
    if (idx >= 0) {
      next = current.map((it, i) =>
        i === idx ? { ...it, qty: (it.qty || 0) + (item.qty || 1) } : it
      );
    } else {
      next = [...current, { ...item, qty: item.qty || 1 }];
    }
    persistCartForToken(next, t);
    dispatch({ type: CART_SUCCESS, payload: next });
    return next;
  } catch (err) {
    dispatch({ type: CART_FAILED, payload: err?.message || err });
    throw err;
  }
};

/**
 * updateItemQty - set exact qty for a product id (remove if qty <= 0)
 */
export const updateItemQty = (productId, qty, token) => (dispatch, getState) => {
  dispatch({ type: CART_REQ });
  try {
    const current = getState().cartReducer.items || [];
    let next = current.map((it) => (it.id === productId ? { ...it, qty } : it));
    next = next.filter((it) => (it.qty || 0) > 0);
    const t = getToken(token || getState().LoginReducer?.token);
    persistCartForToken(next, t);
    dispatch({ type: CART_SUCCESS, payload: next });
    return next;
  } catch (err) {
    dispatch({ type: CART_FAILED, payload: err?.message || err });
    throw err;
  }
};

/**
 * removeItemFromCart
 */
export const removeItemFromCart = (productId, token) => (dispatch, getState) => {
  dispatch({ type: CART_REQ });
  try {
    const current = getState().cartReducer.items || [];
    const next = current.filter((it) => it.id !== productId);
    const t = getToken(token || getState().LoginReducer?.token);
    persistCartForToken(next, t);
    dispatch({ type: CART_SUCCESS, payload: next });
    return next;
  } catch (err) {
    dispatch({ type: CART_FAILED, payload: err?.message || err });
    throw err;
  }
};

/**
 * clearCartForCurrentUser - on logout
 * Removes per-user key from localStorage and clears redux cart
 */
export const clearCartForCurrentUser = (token) => (dispatch, getState) => {
  try {
    const t = getToken(token || getState().LoginReducer?.token);
    const key = cartKeyForToken(t);
    // remove specific key
    try {
      localStorage.removeItem(key);
    } catch (e) {}
    dispatch({ type: CART_CLEAR });
  } catch (err) {
    dispatch({ type: CART_FAILED, payload: err?.message || err });
  }
};
