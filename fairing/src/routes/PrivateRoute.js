import {Redirect, Route} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useCookies} from 'react-cookie';
import axios from "axios";
import '../scss/Loading.css'
import LoadingScreen from "./components/LoadingScreen";

function PrivateRoute({component: Component, ...rest}) {

    const [auth, setAuth] = useState(false);
    const [isTokenValidated, setIsTokenValidated] = useState(false);
    const [cookies, removeCookie] = useCookies(['utkn']);

    useEffect(() => {
        axios.get('http://192.168.0.3:8000/authentication/validate/', {
            headers: {
                'Authorization': 'Token '.concat(cookies.utkn)
            }
        }).then((res) => {
            if (res.status === 200) {
                setAuth(true);
            }
        }).catch((err) => {
            setAuth(false);
            removeCookie('utkn')
        }).then(() =>
            setTimeout(function () {
                setIsTokenValidated(true)
            }, 2000)
        );
    }, [cookies.utkn, removeCookie])

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
