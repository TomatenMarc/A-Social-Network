import React, {Component} from 'react';
import {Form, Grid, Image, Message, Segment} from "semantic-ui-react";
import logo from '../../resources/logo.jpg'
import {NavLink, Redirect} from "react-router-dom";
import {withCookies} from "react-cookie";
import axios from "axios";

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            success: false,
            error: false,
            username: "",
            password: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        event.preventDefault();
        if (event.target.placeholder === "Username")
            this.setState({username: event.target.value})
        else if (event.target.placeholder === "Password")
            this.setState({password: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const {cookies} = this.props
        axios.post("http://localhost:8000/authentication/login/", {
            "username": this.state.username,
            "password": this.state.password
        }).then(result => {
            if (result.status === 200) {
                cookies.set("token", result.data.token)
                this.setState({
                    success: true
                })
            }
        }).catch(error => {
            this.setState({
                error: true
            })
        })

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
                        <Form size='large'
                              error={this.state.error}
                              onSubmit={this.handleSubmit}>
                            <Segment raised>
                                <Form.Input
                                    fluid
                                    icon='user'
                                    iconPosition='left'
                                    placeholder='Username'
                                    type='text'
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                />
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Password'
                                    type='password'
                                    value={this.state.password}
                                    onChange={this.handleChange}
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

export default withCookies(LoginForm);