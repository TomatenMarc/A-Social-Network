import React, {Component} from 'react';
import {Form, Grid, Image, Message, Segment} from "semantic-ui-react";
import logo from "../../resources/logo.jpg";
import {NavLink} from "react-router-dom";

class SignUpForm extends Component {
    render() {
        return (
            <div>
                <Grid textAlign='center' style={{height: '100vh'}} verticalAlign='middle'>
                    <Grid.Column style={{maxWidth: "70%"}}>
                        <Image style={{maxWidth: "70%", marginBottom: "3em"}}
                               src={logo}
                               circular
                               size="small"
                               centered
                        />
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
                                <Form.Input
                                    fluid
                                    icon='mail'
                                    iconPosition='left'
                                    placeholder='E-Mail'
                                    type='email'
                                />
                                <Form.Button
                                    type='submit'
                                    secondary
                                    fluid
                                    size='large'
                                >
                                    Submit
                                </Form.Button>
                            </Segment>
                        </Form>
                        <Message>
                            Account already setup? <NavLink to="/logout">Login!</NavLink>
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default SignUpForm;