import React, {Component} from 'react';
import {Button, Icon} from "semantic-ui-react";
import {Cookies, withCookies} from "react-cookie";
import axios from "axios";
import {instanceOf, PropTypes} from "prop-types";

class FollowUnfollowButton extends Component {

    /**
     * This component is a follow/unfollow button.
     * It needs the information if the corresponding account is a friend of the calling account.
     * Depending on friend it will decide to make follow or to unfollow.
     * Therefore it needs the user token for validation.
     * @type {{uid: *, friend: *, cookies: Validator<NonNullable<Cookies>>}}
     */
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired,
        friend: PropTypes.bool.isRequired,
        uid: PropTypes.number.isRequired
    };

    /**
     * This components will decide based on friend if the calling account can follow or unfollow.
     * The uid is of the account shown to the calling account.
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            friend: this.props.friend,
            uid: this.props.uid,
        }
        this.handleClick = this.handleClick.bind(this)
    }

    /**
     * This method will be triggered if the button is clicked.
     * Then it will follow or unfollow the corresponding account.
     * This is done in the backend. Therefore the user token is needed.
     * @param event when clicking the button.
     */
    handleClick = (event) => {
        event.preventDefault();
        const {cookies} = this.props
        const utkn = cookies.get("utkn")
        let url = process.env.REACT_APP_API_URL.concat('/accounts/follow/').concat(this.state.uid).concat("/")
        if (this.state.friend)
            url =  process.env.REACT_APP_API_URL.concat('/accounts/unfollow/').concat(this.state.uid).concat("/")

        axios.post(url, {}, {
            headers: {
                'Authorization': 'Token '.concat(utkn)
            }
        }).then((res) => {
            if (res.status === 200) {
                this.setState({
                    friend: !this.state.friend
                })
            }
        }).catch((err) => {
            console.log("Error")
        })
    }

    /**
     * Follow/Unfollow button to provide a social option.
     * @returns {JSX.Element}
     */
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