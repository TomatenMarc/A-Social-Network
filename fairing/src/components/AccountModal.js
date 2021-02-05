import React, {Component} from 'react';
import {Image, List, Modal} from "semantic-ui-react";
import {PropTypes} from "prop-types";
import {Link} from "react-router-dom";


class AccountModal extends Component {

    /**
     * This component is a modal to show the community.
     * Therefore it must be decided to open or to close the modal.
     * Furthermore a url must be given to this component.
     * This component must lead to a view where accounts are provided.
     * Those parameters must therefore be given in the props.
     * @type {{onClose: *, url: *, modalOpen: *}}
     */
    static propTypes = {
        modalOpen: PropTypes.bool.isRequired,
        onClose: PropTypes.func.isRequired,
        accounts: PropTypes.array
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
                    <List selection animated divided verticalAlign='middle' size='big'>
                        {
                            this.props.accounts.length !== 0 ?
                                this.props.accounts.map((account, index) => {
                                    return <List.Item as={Link}
                                                      to={"/public/account/".concat(account.user.id.toString())}
                                                      key={index}>
                                        <Image
                                            avatar
                                            src={process.env.REACT_APP_API_URL.concat(account.image)}/>
                                        <List.Content>
                                            <List.Header as="h1">{account.user.username}</List.Header>
                                            <List.Description>
                                                {account.biography}
                                            </List.Description>
                                        </List.Content>
                                    </List.Item>
                                })
                                :
                                <List.Item>
                                    <List.Content>
                                        <List.Header as="h1">Pretty empty!</List.Header>
                                    </List.Content>
                                </List.Item>

                        }
                    </List>
                </Modal.Content>
            </Modal>
        )
    }
}

export default AccountModal;