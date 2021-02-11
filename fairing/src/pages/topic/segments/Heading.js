import React, {Component} from 'react';
import {Header} from "semantic-ui-react";
import HeadingTemplate from "../../../components/HeadingTemplate";
import {PropTypes} from "prop-types";

class Heading extends Component {

    /**
     * This component needs the called tag from the calling component.
     * @type {{tag: *}}
     */
    static propTypes = {
        tag: PropTypes.string.isRequired
    };

    /**
     * This is the heading for the topic observation.
     * It will show the called topic tag.
     * @returns {JSX.Element}
     */
    render() {
        return (
            <HeadingTemplate>
                <div className="centered">
                    <Header as='h1' inverted>#{this.props.tag}</Header>
                </div>
            </HeadingTemplate>
        );
    }
}

export default Heading;