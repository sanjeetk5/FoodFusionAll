import {
  LOGIN_FAILED,
  LOGIN_REQ,
  LOGIN_SUCC,
  REGISTER_FAILED,
  REGISTER_REQ,
  REGISTER_RESET,
  REGISTER_SUCC,
} from "./ActionTypes";

const init = {
  token: "",
  isLoading: false,
  isError: false,
  isRegistered: false, // <-- use boolean
};

export const LoginReducer = (state = init, action) => {
  switch (action.type) {
    case LOGIN_REQ:
      return {
        ...state,
        token: "",
        isLoading: true,
        isError: false,
        isRegistered: false,
      };
    case LOGIN_SUCC:
      return {
        ...state,
        token: action.payload,
        isLoading: false,
        isError: false,
        isRegistered: false,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        token: "",
        isLoading: false,
        isError: true,
        isRegistered: false,
      };
    case REGISTER_REQ:
      return {
        ...state,
        token: "",
        isLoading: true,
        isError: false,
        isRegistered: false,
      };
    case REGISTER_SUCC:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isRegistered: true, // <-- boolean true on success
      };
    case REGISTER_FAILED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        isRegistered: false,
      };
    case REGISTER_RESET:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isRegistered: false, 
      };
    default:
      return state;
  }
};
