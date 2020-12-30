import React, {Component} from 'react';
import {Icon, Form, Grid, Image, Message, Segment} from "semantic-ui-react";
import logo from '../../resources/logo.jpg'
import {NavLink, Redirect} from "react-router-dom";

class LoginForm extends Component {
    handle

    constructor(props) {
        super(props);
        this.state = {
            success: false,
            error: false
        }
    }

    render() {
        if (this.state.success)
            return <Redirect to={{pathname: '/'}}/>
        return (
            <div>
                <Grid textAlign='center' style={{height: '100vh'}} verticalAlign='middle'>
                    <Grid.Column style={{maxWidth: "70%"}}>
                        <Image style={{maxWidth: "70%", marginBottom: "3em"}}
                               src={logo}
                               circular
                               size="small"
                               centered/>
                        <Form size='large' error={this.state.error}>
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
                                <Form.Button
                                    type='submit'
                                    secondary
                                    fluid
                                    size='large'
                                    onClick={() => this.setState({error: true})}>
                                    Login
                                </Form.Button>

                                <Message error>
                                    <Message.Header>
                                        Oh no! Please check your data.
                                    </Message.Header>
                                </Message>
                            </Segment>
                        </Form>
                        <Message>
                            New to us? <NavLink to="/signup">Sign Up!</NavLink>
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }

}

export default LoginForm;