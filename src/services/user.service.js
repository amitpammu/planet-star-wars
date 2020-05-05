import config from 'config';
import { authHeader } from '../helpers';


/**
 * 
 * @param {String} username  
 * @param {String} password
 * @description Api call to get user details  
 */
const login = (username, password) => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },

    };

    // API CALL to SWAPI
    return fetch(`${config.apiUrl}/people/?search=${username}`, requestOptions)
        .then(handleResponse)
        .then(user => {
            if (user.count == 0) throw Error("Invalid User");
            if (user.count > 0 && user.results[0].birth_year !== password) {// validating user enter password
                throw Error("Invalid User");
            }
            // store user details in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user.results[0]));
            //store user request count default value 0
            localStorage.setItem("requestCount", 0);

            return user.results[0];
        });
}

const logout = () => {
    // remove user from local storage to log user out
    localStorage.removeItem('user');

    // remove user request count
    localStorage.removeItem('requestCount');

    // remove user request minutes, 
    //to check number of request in a minute
    localStorage.removeItem('reqTime');
}

// API request to get the search result
const search = (str) => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    // API CALL TO SWAPI
    return fetch(`${config.apiUrl}/planets/?search=${str}`, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        });
}

// handle API response
const handleResponse = response => {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
export const userService = {
    login,
    search,
    logout,
};