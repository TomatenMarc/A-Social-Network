import React, {Component} from 'react';
import {Button, Icon} from "semantic-ui-react";

class FollowUnfollowButton extends Component {
    render() {
        return (
            <Button inverted animated='fade' onClick={() => {
                alert("Friends!")
            }}>
                <Button.Content visible>{this.props.friend ? "Unfollow" : "Follow"}</Button.Content>
                <Button.Content hidden>
                    <Icon name={this.props.friend ? 'delete' : 'handshake'}/>
                </Button.Content>
            </Button>
        );
    }
}

export default FollowUnfollowButton;