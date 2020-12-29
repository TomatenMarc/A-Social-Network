import React from "react";
import {Route, Switch} from "react-router-dom";
import MainPage from "../pages/main/MainPage";

export function Routes() {
    return <Switch>
        <Route path="/" exact component={MainPage}/>
    </Switch>
}