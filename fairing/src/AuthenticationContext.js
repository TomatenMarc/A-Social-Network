import React, { createContext } from 'react';
import { withRouter } from 'react-router-dom';
import { withCookies } from "react-cookie";
import axios from "axios";

export const AuthenticationContext = createContext({
    login: async (username, password) => { },
    loginWithToken: async () => { },
    logout: () => { },
    register: () => { },
    isAuthenticated: () => { return false; },
    get: async (url, config) => { },
    post: async (url, config) => { },
    put: async (url, config) => { },
});

class AuthenticationProvider extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            token: null,
            isUserLoggedIn: false,
            get: this.get,
            post: this.post,
            put: this.put,
            login: this.login,
            loginWithToken: this.loginWithToken,
            logout: this.logout,
            register: this.register,
            isAuthenticated: this.isAuthenticated,
        };
    }


    /**
     * Get user authentication token from cookie
     * @returns user token
     */
    getTokenFromCookie = () => {
        const { cookies } = this.props
        return cookies.get("utkn")
    }

    /**
     * Saves the user authentication token to a cookie
     * @param {string} token user token
     */
    saveTokenToCookie = (token) => {
        const { cookies } = this.props
        this.removeTokenCookie();
        cookies.set("utkn", token, { sameSite: 'Lax' })
    }

    /**
     * Removes the token cookie
     */
    removeTokenCookie = () => {
        const { cookies } = this.props
        cookies.remove("utkn");
    }

    /**
     * Login user
     * @param {string} username 
     * @param {string} password 
     * @returns True if logged in, otherwise false
     */
    login = async (username, password) => {
        const response = await this.postUnauthorized(process.env.REACT_APP_API_URL.concat("/authentication/login/"), { username, password });

        if (response && response.status === 200 && response.data && response.data.token) {
            this.saveTokenToCookie(response.data.token);
            this.setState({
                token: response.data.token,
                isUserLoggedIn: true
            });
            return true;
        }

        return false;
    };

    /**
     * Login user with token from cookie
     * @returns True if logged in, otherwise false
     */
    loginWithToken = async () => {
        const token = this.getTokenFromCookie();
        const response = await this.getUnauthorized(process.env.REACT_APP_API_URL.concat('/authentication/validate/'), null, { 'Authorization': 'Token ' + token });

        if (response && response.status === 200) {
            this.setState({
                token,
                isUserLoggedIn: true
            });
            return true;
        }

        this.removeTokenCookie();
        return false;
    };

    logout = async () => {
        const response = await this.post(process.env.REACT_APP_API_URL.concat("/authentication/logout/"), {});

        if (response && response.status === 200) {
            this.setState({
                token: null,
                isUserLoggedIn: false
            });
            return true;
        }

        this.removeTokenCookie();
        return false;
    };

    /**
     * Create a new user
     * @param {string} username 
     * @param {string} password 
     * @param {string} email 
     * @returns True if logged in, otherwise false
     */
    register = async (username, password, email) => {
        const response = await this.postUnauthorized(process.env.REACT_APP_API_URL.concat("/authentication/register/"),
            { username, password, email });

        if (response && response.status === 201 && response.data && response.data.token) {
            this.saveTokenToCookie(response.data.token);
            this.setState({
                token: response.data.token,
                isUserLoggedIn: true
            });
            return true;
        }

        return false;
    };

    isAuthenticated = () => {
        const { token, isUserLoggedIn } = this.state;
        return token && isUserLoggedIn;
    };

    /**
     * Get the authorization header with token
     * @returns headers: Authorization: 'Token ' + token
     */
    getAuthorizationHeader = () => {
        const { token } = this.state;

        return {
            headers: {
                'Authorization': 'Token ' + token
            }
        }
    }

    /**
     * Unauthorized get request to server
     * @param {string} url api request url
     * @param {object} params query parameters
     * @param {object} headers headers fro request
     * @returns axios get request promise
     */
    getUnauthorized = async (url, params, headers) => {
        const config = {};

        if (headers)
            config["headers"] = headers;

        if (params)
            config["params"] = params;

        return await axios.get(url, config);
    };

    /**
   * Unauthorized post request to server
   * @param {string} url api request url
   * @param {object} data body data to send
   * @param {object} headers headers fro request
   * @param {func} onUploadProgress axios onUploadProgress
   * @returns axios post request promise
   */
    postUnauthorized = async (url, data, headers, onUploadProgress) => {
        const config = {};

        if (headers)
            config["headers"] = headers;

        if (onUploadProgress)
            config["onUploadProgress"] = onUploadProgress;

        return await axios.post(url, data, config);
    };

    /**
     * Authorized get request to server
     * @param {string} url api request url
     * @param {object} params query parameters
     * @returns axios get request promise
     */
    get = async (url, params) => {
        if (!this.isAuthenticated())
            return null;

        const config = this.getAuthorizationHeader();

        if (params)
            config["params"] = params;

        return await axios.get(url, config);

    };

    /**
     * Authorized post request to server
     * @param {string} url api request url
     * @param {object} data body data to send
     * @returns axios post request promise
     */
    post = async (url, data, onUploadProgress) => {
        if (!this.isAuthenticated())
            return null;

        const config = this.getAuthorizationHeader();

        if (onUploadProgress)
            config["onUploadProgress"] = onUploadProgress;

        return await axios.post(url, data, config);
    };

    /**
     * Authorized update request to server
     * @param {string} url api request url
     * @param {FormData} formData data to update
     * @returns axios put request promise
     */
    put = async (url, formData, onUploadProgress) => {
        if (!this.isAuthenticated())
            return null;
        const config = this.getAuthorizationHeader();
        config.headers["Content-type"] = "multipart/form-data"

        if (onUploadProgress)
            config["onUploadProgress"] = onUploadProgress;

        return await axios.put(url, formData, config);
    };


    render() {
        return (
            <AuthenticationContext.Provider value={this.state}>
                {this.props.children}
            </AuthenticationContext.Provider>
        );
    }
}

export default withCookies(withRouter(AuthenticationProvider));

export const AuthenticationConsumer = AuthenticationContext.Consumer;