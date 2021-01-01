import React, {Component} from 'react';
import {Grid, Segment} from "semantic-ui-react";
import Follower from "../components/Follower";
import Following from "../components/Following";

class Networking extends Component {
    render() {
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