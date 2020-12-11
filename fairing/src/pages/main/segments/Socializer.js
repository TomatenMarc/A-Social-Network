import React, {Component} from 'react';
import {Button, Container, Grid, Header, Image, Segment} from "semantic-ui-react";

class Socializer extends Component {
    render() {
        return (
            <Segment style={{padding: '0em'}} vertical>
                <Grid celled='internally' columns='equal' stackable>
                    <Grid.Row textAlign='center'>
                        <Grid.Column style={{paddingBottom: '5em', paddingTop: '5em'}}>
                            <Container>
                                <Header as='h3' style={{fontSize: '2em'}}>
                                    "SolAr"
                                </Header>
                                <p style={{fontSize: '1.33em'}}>Social linked Arguments</p>
                            </Container>
                        </Grid.Column>

                        <Grid.Column style={{paddingBottom: '5em', paddingTop: '5em'}}>
                            <Container>
                                <Header as='h3' style={{fontSize: '2em'}}>
                                    "I think oven makers are neglected on a veggie day because it doesn't meet their
                                    caloric needs"
                                </Header>
                                <p style={{fontSize: '1.33em'}}>
                                    <Image avatar src='https://react.semantic-ui.com/images/avatar/large/nan.jpg'/>
                                    <b>Karen0815</b>
                                </p>
                                <Button.Group>
                                    <Button positive icon="smile"/>
                                    <Button.Or/>
                                    <Button negative icon="frown"/>
                                </Button.Group>
                            </Container>
                        </Grid.Column>

                    </Grid.Row>
                </Grid>
            </Segment>
        );
    }
}

export default Socializer;