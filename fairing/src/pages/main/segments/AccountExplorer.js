import React, {Component} from 'react';
import AccountModal from "../../../components/AccountModal";
import {Button, Grid, Header, Icon, Segment} from "semantic-ui-react";
import axios from "axios";
import {Cookies, withCookies} from "react-cookie";
import {instanceOf} from "prop-types";

class AccountExplorer extends Component {

    /**
     * This component is to show for exploring the community.
     * While exploring the community one can decide to visit an account.
     * For the exploration and validation the user token must be provided.
     * @type {{cookies: Requireable<Cookies>}}
     */
    static propTypes = {
        cookies: instanceOf(Cookies),
    };

    /**
     * The community will be shown in a scrollable modal.
     * Therefore there are the handleOpen and handleClose methods.
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            accounts: []
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
     * This method pulls all available accounts after the component mounted.
     * Therefore the user token is needed.
     */
    componentDidMount() {
        const {cookies} = this.props;
        const utkn = cookies.get("utkn")
        axios.get(process.env.REACT_APP_API_URL.concat("/accounts/show/all/"), {
            headers: {
                'Authorization': 'Token '.concat(utkn)
            }
        }).then((res) => {
            if (res.status === 200) {
                this.setState({
                    accounts: res.data
                })
            }
        }).catch((err) => {
            console.log("Error")
        })
    }


    /**
     * This will return the segment for exploring the community.
     * @returns {JSX.Element}
     */
    render() {
        return (
            <Segment vertical>
                <Grid celled='internally' columns='equal' stackable>
                    <Grid.Row textAlign='center'>
                        <Grid.Column style={{paddingBottom: '5em', paddingTop: '5em'}}>
                            <Header icon>
                                <Icon name="search"/>
                                Ready to discover the community?
                            </Header>
                            <Grid.Row textAlign='center'>
                                <Grid.Column>
                                    <Button primary onClick={this.handleOpen}>Let's go</Button>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <AccountModal accounts={this.state.accounts}
                              modalOpen={this.state.modalOpen}
                              onClose={this.handleClose}
                />
            </Segment>
        )
    }
}

export default withCookies(AccountExplorer);