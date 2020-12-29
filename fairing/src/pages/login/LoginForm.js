import React, {Component} from 'react';
import {Form, Grid, Header, Image, Message, Segment} from "semantic-ui-react";
import logo from '../../resources/logo.jpg'

class LoginForm extends Component {
    render() {
        return (
            <div>
                <Grid textAlign='center' style={{height: '100vh'}} verticalAlign='middle'>
                    <Grid.Column style={{maxWidth: "70%"}}>
                        <Image style={{maxWidth: "70%", marginBottom:"3em"}} src={logo} circular size="small" centered/>
                        <Form size='large'>
                            <Segment raised>
                                <Form.Input
                                    fluid
                                    icon='user'
                                    iconPosition='left'
                                    placeholder='Username'
                                    type='text'
                                />
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Password'
                                    type='password'
                                />
                                <Form.Button type='submit' secondary fluid size='large'>
                                    Login
                                </Form.Button>
                            </Segment>
                        </Form>
                        <Message>
                            New to us? Sign Up
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }

}

export default LoginForm;