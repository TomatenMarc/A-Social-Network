import React, {Component} from 'react';
import InformationTemplate from "./InformationTemplate";
import {PropTypes} from "prop-types";

class SupportInformation extends Component {
    /**
     * This component shows the how many positive reactions are given for an statement.
     * Therefore the parent must provide an list of all reactions.
     * @type {{reactions: *}}
     */
    static propTypes = {
        reactions: PropTypes.array.isRequired,
    }

    /**
     * This component shows the how many positive reactions are given for an statement.
     * @returns {JSX.Element}
     */
    render() {
        return (
            <InformationTemplate
                icon="thumbs up"
            >
                {this.props.reactions.filter((element) => {
                    return element.vote === 1
                }).length} Supports
            </InformationTemplate>
        );
    }
}

export default SupportInformation;