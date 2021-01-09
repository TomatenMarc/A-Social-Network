import React, {Component} from 'react';
import LoginForm from "./LoginForm";
import '../../scss/Slider.css'
import {withCookies} from "react-cookie";

class LoginPage extends Component {
    /**
     * This component is for the login of the user.
     * It will show the login form as well as an animated background.
     * @returns {JSX.Element}
     */
    render() {
        return (
            <div>
                <div className="slider"/>
                <div className="slider fast"/>
                <div className="slider slow"/>
                <LoginForm/>
            </div>
        );
    }
}

export default withCookies(LoginPage);