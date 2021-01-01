import React, {Component} from 'react';
import {Header, Icon} from "semantic-ui-react";

class Following extends Component {
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