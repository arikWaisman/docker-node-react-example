import {
  LOAD_AUTH_FROM_STORAGE,
  USER_SIGNOUT_COMPLETE,
  USER_SIGNIN_COMPLETE,
  VALID_TOKEN_COMPLETE,
  INVALID_TOKEN_COMPLETE,
} from '../actions/action_types';

const InitialState = {
  token: null,
  user: null,
  isLoggedIn: false,
  authLoadedIntoState: false,
};

export default (state = InitialState, action) => {
  switch (action.type) {
    case LOAD_AUTH_FROM_STORAGE:
      return {
        ...state,
        ...action.payload,
        authLoadedIntoState: true,
      };

    case VALID_TOKEN_COMPLETE:
      return {
        ...state,
        tokenChecked: true,
      };

    case INVALID_TOKEN_COMPLETE:
      return {
        ...state,
        isLoggedIn: false,
      };

    case USER_SIGNIN_COMPLETE:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        isLoggedIn: true,
      };

    case USER_SIGNOUT_COMPLETE:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        token: null,
      };

    default:
      return state;
  }
};
