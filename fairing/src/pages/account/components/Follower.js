import React, {Component} from 'react';
import {Header, Icon} from "semantic-ui-react";

class Follower extends Component {
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