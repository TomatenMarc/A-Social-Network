import React, {Component} from 'react';
import axios from "axios";
import {withCookies} from "react-cookie";
import InvertedStackableGrid from "../../../components/InvertedStackableGrid";
import {Container, Grid, Header, Icon, Image, Label, List, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";

class HashtagExplorer extends Component {
    /**
     * This component shows the trending hashtags.
     * One hashtag is shown if there is at least one participant which is not the user itself.
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            results: []
        }
    }

    /**
     * This method loads the trending hashtags.
     */
    componentDidMount() {
        const {cookies} = this.props
        const utkn = cookies.get("utkn")
        axios.get(process.env.REACT_APP_API_URL.concat("/contents/trending/hashtag/"),
            {
                headers: {
                    'Authorization': 'Token '.concat(utkn)
                }
            }).then(result => {
            if (result.status === 200) {
                this.setState({
                    results: result.data,
                    loading: false
                })
            }
        }).catch(error => {
            this.setState({
                loading: true
            })
        })
    }

    /**
     * This method returns the icon representation of the trending hashtags for mobile view.
     * @param result: The results (trending hashtag) to be shown.
     * @returns {JSX.Element|null}
     */
    trendingHashtagMobile = (result) => {
        if (result["participants"].length > 0) {
            return <Header as={Link} to={"/topic/".concat(result.tag)} style={{
                margin: 0
            }} icon textAlign='center'>
                <Icon name={'hashtag'} circular/>
                {
                    result.tag
                }
            </Header>
        }
        return null
    }

    /**
     * This method returns the list representation of the trending hashtags for computer and tablet view.
     * @param result: The result (trending hashtag) to be shown in the list.
     * @returns {JSX.Element|null}
     */
    trendingHashtag = (result) => {
        let random = Math.floor(Math.random() * Math.floor(result["participants"].length));
        let participant = result["participants"][random]

        if (result["participants"].length > 0) {
            return <List.Item>
                <Segment basic>
                    <Header as={Link} to={"/topic/".concat(result.tag)}>
                        #{result.tag}
                    </Header>
                    <Container>
                        <p>Argue with <b>{result["participants"].length}</b> others like:</p>
                        <Label as={Link} to={"/public/account/".concat(participant.user.id)} image color={"blue"}>
                            <Image avatar
                                   size={"tiny"}
                                   src={process.env.REACT_APP_API_URL.concat(participant.image)}/>
                            {participant.user.username}
                        </Label>
                    </Container>
                </Segment>
            </List.Item>
        }
        return null
    }

    /**
     * This component will advertise a trending hashtag.
     * It will show the hashtags, the information regarding this hashtag and three participants.
     * If the user clicks on the hashtag the component will lead to the corresponding hashtag.
     * If the user clicks on one of the three presented users the component will lead to the corresponding account.
     * @returns {JSX.Element}
     */
    render() {
        if (this.state.loading) {
            return <div>
                Fetching...
            </div>
        }
        return (
            <Grid columns='equal' padded relaxed>
                <Grid.Row centered only={'mobile'}>
                    <InvertedStackableGrid
                        left={this.trendingHashtagMobile(this.state.results[0])}
                        center={this.trendingHashtagMobile(this.state.results[1])}
                        right={this.trendingHashtagMobile(this.state.results[2])}
                    />
                </Grid.Row>
                <Grid.Row centered only={"computer tablet"}>
                    <List divided style={{minWidth: "100%"}}>
                        {this.trendingHashtag(this.state.results[0])}
                        {this.trendingHashtag(this.state.results[1])}
                        {this.trendingHashtag(this.state.results[2])}
                    </List>
                </Grid.Row>
            </Grid>
        );
    }
}

export default withCookies(HashtagExplorer);