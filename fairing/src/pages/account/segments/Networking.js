import React, {Component} from 'react';
import {Grid, Segment} from "semantic-ui-react";
import Follower from "../components/Follower";
import Following from "../components/Following";
import {PropTypes} from "prop-types";

class Networking extends Component {

    /**
     * This component is for the representation of the network embedding of the user.
     * It wil distinguish between public and private accounts.
     * A public account will show less information regarding the network embedding of the specific account.
     * Todo: Add a modal for showing the friends.
     * Todo: It should be possible to delete friendships.
     * @type {{private: *, follower: *, following: *}}
     */
    static propTypes = {
        private: PropTypes.bool.isRequired,
        following: PropTypes.array.isRequired,
        follower: PropTypes.array
    };

    /**
     * This will show the network embedding of the corresponding account.
     * @returns {JSX.Element}
     */
    render() {
        if (this.props.private)
            return <Segment style={{padding: '0em'}} vertical>
                <Grid celled='internally' columns='equal' stackable>
                    <Grid.Row>
                        <Grid.Column style={{paddingBottom: '5em', paddingTop: '5em'}}>
                            <Following following={this.props.following}/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>

        return (
            <Segment style={{padding: '0em'}} vertical>
                <Grid celled='internally' columns='equal' stackable>
                    <Grid.Row>
                        <Grid.Column style={{paddingBottom: '5em', paddingTop: '5em'}}>
                            <Follower follower={this.props.follower}/>
                        </Grid.Column>
                        <Grid.Column style={{paddingBottom: '5em', paddingTop: '5em'}}>
                            <Following following={this.props.following}/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        );
    }
}

export default Networking;