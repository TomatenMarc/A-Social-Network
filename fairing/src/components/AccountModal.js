import React, {Component} from 'react';
import {Image, Modal} from "semantic-ui-react";
import {PropTypes} from "prop-types";


class AccountModal extends Component {

    /**
     * This component is a modal to show the community.
     * Therefore it must be decided to open or to close the modal.
     * Those parameters must therefore be given in the props.
     * @type {{onClose: *, modalOpen: *}}
     */
    static propTypes = {
        modalOpen: PropTypes.bool.isRequired,
        onClose: PropTypes.func.isRequired
    };

    /**
     * This returns a basis modal with scrollable content.
     * @returns {JSX.Element}
     */
    render() {
        return (
            <Modal
                open={this.props.modalOpen}
                onClose={this.props.onClose}
                closeIcon
            >
                <Modal.Content scrolling>
                    <Image fluid src='https://react.semantic-ui.com/images/avatar/large/matthew.png'/>
                    <Image fluid src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'/>
                </Modal.Content>
            </Modal>
        )
    }
}

export default AccountModal;