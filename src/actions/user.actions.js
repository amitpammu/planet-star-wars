import { userConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from './';
import { history } from '../helpers';

/**
 * 
 * @param {String} username Username 
 * @param {String} password Password
 */
const login = (username, password) => {
    return dispatch => {
        dispatch(request({ username }));

        // Calling user service
        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    // Sub action function within the scope
    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

/**
 * @description User logout
 */
const logout = () => {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

/**
 * 
 * @param {String} str Search String 
 */
const searchPlanet = str => {
    return dispatch => {
        dispatch(request(str));

        // user planet search service
        userService.search(str)
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            );
    };

    // Defining and Calling Sub Actions
    function request(str) { return { type: userConstants.SEARCH_REQUEST, str } }
    function success(data) { return { type: userConstants.SEARCH_SUCCESS, data } }
    function failure(error) { return { type: userConstants.SEARCH_FAILURE, error } }
}

// Exported Functions
export const userActions = {
    login,
    logout,
    searchPlanet,
};