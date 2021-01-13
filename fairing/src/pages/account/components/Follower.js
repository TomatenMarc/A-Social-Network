import React, {Component} from 'react';
import {Header, Icon} from "semantic-ui-react";
import {PropTypes} from "prop-types";
import AccountModal from "../../../components/AccountModal";

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
     * This component is to show for follower.
     * While exploring the follower one can decide to visit them
     * The follower will be shown in a scrollable modal.
     * Therefore there are the handleOpen and handleClose methods.
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false
        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }


    /**
     * This method is for handling the opening of the modal.
     * @param event of the click.
     */
    handleOpen = (event) => {
        event.preventDefault();
        this.setState({modalOpen: true});
    }

    /**
     * This method is for handling the closing of the modal.
     * It also includes esc, a click beside the modal or the cross-button at the top of the modal.
     * @param event of the click beside the modal or on the leave cross or esc.
     */
    handleClose = (event) => {
        event.preventDefault();
        this.setState({modalOpen: false});
    }

    /**
     * This will show the followers.
     * If the user clicks on the follower symbol a model showing the followers will pop up.
     * @returns {JSX.Element}
     */
    render() {
        return (
            <div>
                <Header as='h2' icon textAlign='center' onClick={this.handleOpen}>
                    <Icon name='users' circular/>
                    <Header.Content>{this.props.follower.length.toString().concat(" Follower")}</Header.Content>
                </Header>
                <AccountModal modalOpen={this.state.modalOpen}
                              onClose={this.handleClose}
                              url={"http://192.168.0.3:8000/accounts/show/follower/"}
                />
            </div>
        );
    }
}

export default Follower;