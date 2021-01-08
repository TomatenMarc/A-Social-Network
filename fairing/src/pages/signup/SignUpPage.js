import React, {Component} from 'react';
import SignUpForm from "./SignUpForm";
import {Cookies, withCookies} from "react-cookie";
import {instanceOf} from "prop-types";

class SignUpPage extends Component {
    /**
     * This is the sign up page where the sign up takes place.
     * @type {{cookies: Validator<NonNullable<Cookies>>}}
     */
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    /**
     * This will show the animated background and the sign up form.
     * @returns {JSX.Element}
     */
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