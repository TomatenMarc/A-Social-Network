import React, {Component} from 'react';
import {Grid, Header, Image, Segment} from "semantic-ui-react";
import '../../../scss/Avatar.css'
import FollowUnfollowButton from "../components/FollowUnfollowButton";
import {PropTypes} from "prop-types";
import EditAccountButton from "../components/EditAccountButton";

class Avatar extends Component {
    /**
     * This component shows the avatar of an account.
     * If this component is used to show a public account a follow/unfollow button will be shown.
     * @type {{image: *, uid: *, private: *, friend: *, biography: *, username: *}}
     */
    static propTypes = {
        image: PropTypes.string.isRequired, // url appendix to the image
        username: PropTypes.string.isRequired,
        biography: PropTypes.string.isRequired,
        uid: PropTypes.number,
        // Followings: Necessary for follow/unfollow option
        forPublicUse: PropTypes.bool.isRequired, // is component for private of public accounts?
        friend: PropTypes.bool // is the public account a friend?
    };

    /**
     * This will show the avatar in a segment.
     * Dependent on the use for a public or private account there will be a follow/unfollow button.
     *@returns {JSX.Element}
     */
    render() {
        return (
            <Segment inverted style={{padding: '8em 0em'}} vertical>
                <Grid container stackable centered>
                    <Grid.Row>
                        <div className="avatar">
                            <Image src={this.props.image}
                                   circular
                                   size="small"
                                   style={{
                                       marginBottom: "2em",
                                       animation: "wiggle 15s ease infinite alternate"
                                   }}/>
                        </div>
                    </Grid.Row>
                    <Grid.Row>
                        <Header inverted>
                            {this.props.username}
                        </Header>
                    </Grid.Row>
                    <Grid.Row style={{margin: "0 10%"}}>
                        {this.props.biography}
                    </Grid.Row>
                    <Grid.Row>
                        {this.props.forPublicUse ?
                            <FollowUnfollowButton friend={this.props.friend}
                                                  uid={this.props.uid}/>
                            : <EditAccountButton uid={this.props.uid}
                                                 image={this.props.image}
                                                 biography={this.props.biography}
                                                 handleOpen={this.handleOpen}/>}
                    </Grid.Row>
                </Grid>
            </Segment>
        );
    }
}

export default Avatar;