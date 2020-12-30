import React, {Component} from 'react';
import LoginForm from "./LoginForm";
import '../../scss/Slider.css'
import {withCookies} from "react-cookie";

class LoginPage extends Component {
    render() {
        return (
            <div className="colored">
                <div className="slider"/>
                <div className="slider fast"/>
                <div className="slider slow"/>
                <LoginForm/>
            </div>
        );
    }
}

export default withCookies(LoginPage);