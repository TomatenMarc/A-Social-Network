import React, {Component} from 'react';
import {Header, Icon} from "semantic-ui-react";
import {PropTypes} from "prop-types";
import AccountModal from "../../../components/AccountModal";

class Following extends Component {
    /**
     * This component shows the account followed by the calling account.
     * It requires the list of following in the props.
     * @type {{following: *}}
     */
    static propTypes = {
        following: PropTypes.array.isRequired
    };


    /**
     * This component is to show for accounts the account follows.
     * While exploring the followings one can decide to visit them
     * The followings will be shown in a scrollable modal.
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
     * This will show the accounts the calling account follows.
     * Those will be shown in a modal.
     * @returns {JSX.Element}
     */
    render() {
        return (
            <div>
                <Header as='h2' icon textAlign='center' onClick={this.handleOpen}>
                    <Icon name='street view' circular/>
                    <Header.Content>{this.props.following.length.toString().concat(" Follows")}</Header.Content>
                </Header>
                <AccountModal accounts={this.props.following}
                              modalOpen={this.state.modalOpen}
                              onClose={this.handleClose}
                />
            </div>
        );
    }
}

export default Following;