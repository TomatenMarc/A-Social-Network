import React, {Component} from 'react';
import {Grid, Segment} from "semantic-ui-react";
import StatementExplorer from "../components/StatementExplorer";
import HashtagExplorer from "../components/HashtagExplorer";

class SocialExplorer extends Component {
    /**
     * This component is for social discovery. It will be used s.t. the user will get to know other users.
     * @returns {JSX.Element}
     */
    render() {
        return (
            <Segment style={{padding: '0em'}} vertical>
                <Grid celled='internally' columns='equal' stackable>
                    <Grid.Row textAlign='center'>
                        <Grid.Column style={{paddingBottom: '5em', paddingTop: '5em'}}>
                            <HashtagExplorer/>
                        </Grid.Column>
                        <Grid.Column style={{paddingBottom: '5em', paddingTop: '5em'}}>
                            <StatementExplorer/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        );
    }
}

export default SocialExplorer;