import React, {Component} from 'react';
import {Header, Icon} from "semantic-ui-react";
import {PropTypes} from "prop-types";

class InformationTemplate extends Component {
    /**
     * This component is an template for side information regarding statements.
     * Therefore an icon name must be provided. The information must be an child component.
     * @type {{children: *, icon: *}}
     */
    static propTypes = {
        icon: PropTypes.string.isRequired,
        children: PropTypes.node.isRequired
    }

    /**
     * This is the template information for information with an icon.
     * @returns {JSX.Element}
     */
    render() {
        return (
            <Header style={{
                margin: 0
            }} icon textAlign='center'>
                <Icon name={this.props.icon} circular/>
                {
                    this.props.children
                }
            </Header>
        );
    }
}

export default InformationTemplate;