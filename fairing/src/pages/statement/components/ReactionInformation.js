import React, {Component} from 'react';
import InformationTemplate from "./InformationTemplate";
import {PropTypes} from "prop-types";

class ReactionInformation extends Component {
    /**
     * This component shows the how many reactions are given for an statement.
     * Therefore the parent must provide an list of all reactions.
     * @type {{reactions: *}}
     */
    static propTypes = {
        reactions: PropTypes.array.isRequired,
    }

    /**
     * This component shows the how many reactions are given for an statement.
     * @returns {JSX.Element}
     */
    render() {
        return (
            <InformationTemplate
                icon="comments outline"
            >
                {this.props.reactions.length} Reactions
            </InformationTemplate>
        );
    }
}

export default ReactionInformation;