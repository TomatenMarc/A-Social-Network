import React, {Component} from 'react';
import {Image} from "semantic-ui-react";
import logo from '../../../resources/logo.jpg'
import HeadingTemplate from "../../../components/HeadingTemplate";

class Heading extends Component {
    /**
     * This is the heading of the main page.
     * @returns {JSX.Element}
     */
    render() {
        return (
            <HeadingTemplate>
                <div className="centered">
                    <Image src={logo} circular size="small"/>
                </div>
            </HeadingTemplate>
        );
    }
}

export default Heading;