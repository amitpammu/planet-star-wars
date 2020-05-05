import { userConstants } from '../constants';

export const users = (state = {}, action) => {
  switch (action.type) {
    case userConstants.SEARCH_REQUEST:
      return {
        loading: true
      };
    case userConstants.SEARCH_SUCCESS:
      return {
        ...state,
        searchItems: action.data
      };
    case userConstants.SEARCH_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}