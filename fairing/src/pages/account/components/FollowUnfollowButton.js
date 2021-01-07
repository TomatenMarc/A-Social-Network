import React, {Component} from 'react';
import {Button, Icon} from "semantic-ui-react";

class FollowUnfollowButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            friend: this.props.friend,
            uid: this.props.uid,
        }

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick = (event) => {
        alert("Friend")
        this.setState({
            friend: !this.state.friend
        })
    }

    render() {
        return (
            <Button inverted animated='fade' onClick={this.handleClick}>
                <Button.Content visible>{this.state.friend ? "Unfollow" : "Follow"}</Button.Content>
                <Button.Content hidden>
                    <Icon name={this.state.friend ? 'delete' : 'handshake'}/>
                </Button.Content>
            </Button>
        );
    }
}

export default FollowUnfollowButton;