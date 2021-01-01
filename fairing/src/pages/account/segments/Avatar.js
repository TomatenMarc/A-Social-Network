import React, {Component} from 'react';
import {Grid, Header, Image, Segment} from "semantic-ui-react";

class Avatar extends Component {
    render() {
        return (
            <Segment inverted style={{padding: '8em 0em'}} vertical>
                <Grid container stackable centered>
                    <Grid.Row>
                        <div className="centered">
                            <Image src={this.props.image} circular size="small"/>
                        </div>
                    </Grid.Row>
                    <Grid.Row>
                        <Header inverted>
                            {this.props.username}
                        </Header>
                    </Grid.Row>
                </Grid>
            </Segment>
        );
    }
}

export default Avatar;