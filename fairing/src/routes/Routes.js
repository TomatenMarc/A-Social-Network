import React from "react";
import {Route, Switch} from "react-router-dom";
import MainPage from "../pages/main/MainPage";
import AccountPage from "../pages/account/AccountPage";
import LoginPage from "../pages/login/LoginPage";
import SignUpPage from "../pages/signup/SignUpPage";

export function Routes() {
    return <Switch>
        <Route path="/" exact component={MainPage}/>
        <Route path="/account" exact component={AccountPage}/>
        <Route path="/logout" exact component={LoginPage}/>
        <Route path="/signup" exact component={SignUpPage}/>
    </Switch>
}