import React, {Component} from 'react';
import {Image, List, Modal} from "semantic-ui-react";
import {instanceOf, PropTypes} from "prop-types";
import axios from "axios";
import {Cookies, withCookies} from "react-cookie";
import {Link} from "react-router-dom";


class AccountModal extends Component {

    /**
     * This component is a modal to show the community.
     * Therefore it must be decided to open or to close the modal.
     * Furthermore a url must be given to this component.
     * This component must lead to a view where accounts are provided.
     * Those parameters must therefore be given in the props.
     * @type {{onClose: *, url: *, modalOpen: *, cookies: Validator<NonNullable<Cookies>>}}
     */
    static propTypes = {
        cookies: instanceOf(Cookies),
        modalOpen: PropTypes.bool.isRequired,
        onClose: PropTypes.func.isRequired,
        url: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            accounts: []
        }
    }

    /**
     * This method pulls all available accounts after the component mounted.
     * Therefore the user token is needed.
     */
    componentDidMount() {
        const {cookies} = this.props;
        const utkn = cookies.get("utkn")
        axios.get(this.props.url, {
            headers: {
                'Authorization': 'Token '.concat(utkn)
            }
        }).then((res) => {
            if (res.status === 200) {
                this.setState({
                    accounts: res.data
                })
                console.log(res.data)
            }
        }).catch((err) => {
            console.log("Error")
        })
    }

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
                    <List divided verticalAlign='middle' size='big'>
                        {
                            this.state.accounts.length !== 0 ?
                                this.state.accounts.map((account, index) => {
                                    return <List.Item as={Link}
                                                      to={"/public/account/".concat(account.user.id.toString())}
                                                      key={index}>
                                        <Image
                                            avatar
                                            src={'http://192.168.0.3:8000'.concat(account.image)}/>
                                        <List.Content>
                                            <List.Header as="h1">{account.user.username}</List.Header>
                                            <List.Description>Follows {account["related_to"].length}</List.Description>
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

export default withCookies(AccountModal);