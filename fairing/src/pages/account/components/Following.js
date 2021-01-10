import React, {Component} from 'react';
import {Header, Icon} from "semantic-ui-react";
import {PropTypes} from "prop-types";

class Following extends Component {
    /**
     * This component shows the account followed by the calling account.
     * Todo: Add a onClick event which then shows the follows in a model.
     * It requires the list of following in the props.
     * @type {{following: *}}
     */
    static propTypes = {
        following: PropTypes.array.isRequired
    };

    /**
     * This will show the following accounts.
     * @returns {JSX.Element}
     */
    render() {
        return (
            <div>
                <Header as='h2' icon textAlign='center'>
                    <Icon name='street view' circular/>
                    <Header.Content>{this.props.following.length.toString().concat(" Follows")}</Header.Content>
                </Header>
            </div>
        );
    }
}

export default Following;