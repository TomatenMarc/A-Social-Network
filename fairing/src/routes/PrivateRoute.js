import { Redirect, Route } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import '../scss/Loading.css'
import LoadingScreen from "../components/LoadingScreen";
import { AuthenticationContext } from "../AuthenticationContext";

function PrivateRoute({ component: Component, ...rest }) {
    const context = useContext(AuthenticationContext);

    /**
     * This is a private route which communicates with the backend.
     * Therefore this function checks if an user, represented by its token, can access a particular route.
     * To access a protected route the current user token must be validated by the backend.
     */

    const [auth, setAuth] = useState(false);
    const [isTokenValidated, setIsTokenValidated] = useState(false);
    // different to higher order component the useCookies function can be applied directly.
    const [cookies] = useCookies(['utkn']);

    useEffect(() => {
        /**
         * This method enables similar to componentDidMount the use of certain side effects before loading the
         * component.
         * In this function the effect is to validate the token in the backend.
         */
        if (context)
            context.loginWithToken().then((res) => { setAuth(res); }).catch((err) => {
                setAuth(false);
            }).then(() =>
                setTimeout(function () {
                    setIsTokenValidated(true)
                }, 500)
            );
    }, [cookies.utkn])

    /**
     * While the token is validated a loading-screen is shown.
     * After validation the router will guide to the corresponding component.
     * If the validation has failed the router will redirect to the login.
     */
    if (!isTokenValidated) return <LoadingScreen />
    return (
        <Route
            {...rest}
            render={(props) => auth
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/login' }} />}
        />
    )
}

export default PrivateRoute;
