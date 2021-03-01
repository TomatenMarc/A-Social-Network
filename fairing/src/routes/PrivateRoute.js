import {Redirect, Route} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useCookies} from 'react-cookie';
import axios from "axios";
import '../scss/Loading.css'
import LoadingScreen from "../components/LoadingScreen";

function PrivateRoute({component: Component, ...rest}) {
    /**
     * This is a private route which communicates with the backend.
     * Therefore this function checks if an user, represented by its token, can access a particular route.
     * To access a protected route the current user token must be validated by the backend.
     */

    const [auth, setAuth] = useState(false);
    const [isTokenValidated, setIsTokenValidated] = useState(false);
    // different to higher order component the useCookies function can be applied directly.
    const [cookies, removeCookie] = useCookies(['utkn']);

    useEffect(() => {
        /**
         * This method enables similar to componentDidMount the use of certain side effects before loading the
         * component.
         * In this function the effect is to validate the token in the backend.
         */
        axios.get(process.env.REACT_APP_API_URL.concat('/authentication/validate/'), {
            headers: {
                'Authorization': 'Token '.concat(cookies.utkn)
            }
        }).then((res) => {
            if (res.status === 200) {
                setAuth(true);
            }
        }).catch((err) => {
            setAuth(false);
            //todo: maybe wrong?
            //removeCookie('utkn')
        }).then(() =>
            setTimeout(function () {
                setIsTokenValidated(true)
            }, 500)
        );
    }, [cookies.utkn, removeCookie])

    /**
     * While the token is validated a loading-screen is shown.
     * After validation the router will guide to the corresponding component.
     * If the validation has failed the router will redirect to the login.
     */
    if (!isTokenValidated) return <LoadingScreen/>
    return (
        <Route
            {...rest}
            render={(props) => auth
                ? <Component {...props} />
                : <Redirect to={{pathname: '/login'}}/>}
        />
    )
}

export default PrivateRoute;
