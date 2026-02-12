// reducer.js
import {
  CART_REQ,
  CART_SUCCESS,
  CART_FAILED,
  CART_SET,
  CART_CLEAR,
} from "./ActionTypes";

const init = {
  items: [],
  isLoading: false,
  error: null,
};

export const CartReducer = (state = init, action) => {
  switch (action.type) {
    case CART_REQ:
      return { ...state, isLoading: true, error: null };
    case CART_SUCCESS:
      return { ...state, isLoading: false, items: action.payload || [], error: null };
    case CART_FAILED:
      return { ...state, isLoading: false, error: action.payload || true };
    case CART_SET:
      return { ...state, isLoading: false, items: action.payload || [], error: null };
    case CART_CLEAR:
      return { ...state, isLoading: false, items: [], error: null };
    default:
      return state;
  }
};

export default CartReducer;
