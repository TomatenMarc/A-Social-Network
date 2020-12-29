import React, {Component} from 'react';
import LoginForm from "./LoginForm";
import '../../scss/Slider.css'

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

export default LoginPage;