import {
  FB_LOGIN_SUCCESS,
  FB_LOGIN_FAILED,
  NEW_USER,
  LOGGED_IN_USER
} from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case FB_LOGIN_SUCCESS:
      return { token: action.payload };
    case FB_LOGIN_FAILED:
      return { token: null };
    case LOGGED_IN_USER:
      return { initialAppUse: 'no' };
    case NEW_USER:
      return { initialAppUse: 'yes' };
    default:
      return state;
  }
}
