import React, {Component} from 'react';
import AccountModal from "../../../components/AccountModal";
import {Button, Grid, Header, Icon, Segment} from "semantic-ui-react";

class AccountExplorer extends Component {
    /**
     * This component is to show for exploring the community.
     * While exploring the community one can decide to visit an account.
     * The community will be shown in a scrollable modal.
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
     * This will return the segment for exploring the community.
     * @returns {JSX.Element}
     */
    render() {
        return (
            <Segment basic>
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
                <AccountModal modalOpen={this.state.modalOpen}
                              onClose={this.handleClose}
                              url={"http://192.168.0.3:8000/accounts/show/all/"}
                />
            </Segment>
        )
    }
}

export default AccountExplorer;