import React, {Component} from 'react';
import {Grid, Header, Image, Segment} from "semantic-ui-react";
import '../../../scss/Avatar.css'
import FollowUnfollowButton from "../components/FollowUnfollowButton";

class Avatar extends Component {
    render() {
        return (
            <Segment inverted style={{padding: '8em 0em'}} vertical>
                <Grid container stackable centered>
                    <Grid.Row>
                        <div className="avatar">
                            <div className="shape">
                                <Image src={this.props.image}
                                       circular
                                       size="small"
                                       style={
                                           {
                                               marginBottom: "2em"
                                           }
                                       }/>
                            </div>
                        </div>
                    </Grid.Row>
                    <Grid.Row>
                        <Header inverted>
                            {this.props.username}
                        </Header>
                    </Grid.Row>
                    <Grid.Row>
                        {this.props.biography}
                    </Grid.Row>
                    {!this.props.private ? <Grid.Row>
                        <FollowUnfollowButton friend={this.props.friend} uid={this.props.uid}/>
                    </Grid.Row> : null}
                </Grid>
            </Segment>
        );
    }
}

export default Avatar;