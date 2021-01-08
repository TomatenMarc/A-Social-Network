import React, {Component} from 'react';
import {Button, Icon} from "semantic-ui-react";
import {withCookies} from "react-cookie";
import axios from "axios";

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
        event.preventDefault();
        const {cookies} = this.props
        const utkn = cookies.get("utkn")
        console.log(utkn)
        const url = 'http://192.168.0.3:8000/accounts/follow/'.concat(this.state.uid).concat("/")
        axios.post(url, {}, {
            headers: {
                'Authorization': 'Token '.concat(utkn)
            }
        }).then((res) => {
            if (res.status === 200) {
                console.log("Success")
                this.setState({
                    friend: true
                })
            }
        }).catch((err) => {
            console.log("Error")
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

export default withCookies(FollowUnfollowButton);