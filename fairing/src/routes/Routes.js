import React from "react";
import {Route, Switch} from "react-router-dom";
import MainPage from "../pages/main/MainPage";
import PrivateAccountPage from "../pages/account/PrivateAccountPage";
import LoginPage from "../pages/login/LoginPage";
import SignUpPage from "../pages/signup/SignUpPage";
import PrivateRoute from "./PrivateRoute";
import PublicAccountPage from "../pages/account/PublicAccountPage";

export function Routes() {
    /**
     * This function defines the routes to be switched by the router.
     * In this terms this is the heart of the project, where the linkage of the pages takes place.
     */
    return <Switch>
        <Route path="/login" exact component={LoginPage}/>
        <Route path="/signup" exact component={SignUpPage}/>
        <PrivateRoute path="/public/account/:uid" exact component={PublicAccountPage}/>
        <PrivateRoute path="/account" exact component={PrivateAccountPage}/>
        <PrivateRoute path="/" exact component={MainPage}/>
    </Switch>
}