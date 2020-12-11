import React, {Component} from 'react';
import {Container, Grid, Header, List, Segment} from "semantic-ui-react";

class Footer extends Component {
    /**
     * This component is the footer of the main page.
     * @returns {JSX.Element}
     */
    render() {
        return (
            <Segment inverted vertical style={{padding: '4em 0em'}}>
                <Container>
                    <Grid divided inverted stackable>
                        <Grid.Row>
                            <Grid.Column width={4}>
                                <Header inverted as='h4' content='About'/>
                                <List link inverted>
                                    <List.Item as='a'>Sitemap</List.Item>
                                    <List.Item as='a'>Contact Us</List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Header inverted as='h4' content='Services'/>
                                <List link inverted>
                                    <List.Item as='a'>API-Documentation</List.Item>
                                    <List.Item as='a'>Code-Documentation</List.Item>
                                    <List.Item as='a'>FAQ</List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={7}>
                                <Header as='h4' inverted>
                                    SolAr
                                </Header>
                                SolAr is a social network designed to bring people together.
                                Our goal is to create a factual and substantive digital discussion culture.
                                So go ahead and debate what no one has ever argued before!
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </Segment>
        );
    }
}

export default Footer;