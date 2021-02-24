import React, {Component} from 'react';
import InformationTemplate from "./InformationTemplate";
import {PropTypes} from "prop-types";

class AttackInformation extends Component {
    /**
     * This component shows the how many negative reactions are given for an statement.
     * Therefore the parent must provide an list of all reactions.
     * @type {{reactions: *}}
     */
    static propTypes = {
        reactions: PropTypes.array.isRequired,
    }

    /**
     * This component shows how many negative reactions are given for an parent.
     * @returns {JSX.Element}
     */
    render() {
        return (
            <InformationTemplate
                icon="thumbs down"
            >
                {this.props.reactions.filter((element) => {
                    return element.vote === 2
                }).length} Attacks
            </InformationTemplate>
        );
    }
}

export default AttackInformation;