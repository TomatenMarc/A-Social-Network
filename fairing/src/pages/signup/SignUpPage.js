import React, {Component} from 'react';
import SignUpForm from "./SignUpForm";
import {withCookies} from "react-cookie";

class SignUpPage extends Component {
    render() {
        return (
            <div>
                <div className="slider"/>
                <div className="slider fast"/>
                <div className="slider slow"/>
                <SignUpForm/>
            </div>
        );
    }
}

export default withCookies(SignUpPage);