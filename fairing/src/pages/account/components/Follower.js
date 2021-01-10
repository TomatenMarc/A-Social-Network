import React, {Component} from 'react';
import {Header, Icon} from "semantic-ui-react";
import {PropTypes} from "prop-types";

class Follower extends Component {
    /**
     * This component shows the follower of the calling account.
     * Todo: Add a onClick event which then shows the followers in a model.
     * It requires the followers in the props.
     * @type {{follower: *}}
     */
    static propTypes = {
        follower: PropTypes.array.isRequired
    };

    /**
     * This will show the followers.
     * @returns {JSX.Element}
     */
    render() {
        return (
            <div>
                <Header as='h2' icon textAlign='center'>
                    <Icon name='users' circular/>
                    <Header.Content>{this.props.follower.length.toString().concat(" Follower")}</Header.Content>
                </Header>
            </div>
        );
    }
}

export default Follower;