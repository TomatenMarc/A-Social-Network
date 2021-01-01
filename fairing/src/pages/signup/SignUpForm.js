import React, {Component} from 'react';
import {Form, Grid, Image, Message, Segment} from "semantic-ui-react";
import logo from "../../resources/logo.jpg";
import {NavLink, Redirect} from "react-router-dom";
import {withCookies} from "react-cookie";
import axios from "axios";

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            success: false,
            username: "",
            password: "",
            email: "",
            errorUserField: false,
            errorPasswordField: false,
            errorEmailField: false
        }
    }

    handleChange = (event) => {
        event.preventDefault()
        if (event.target.placeholder === "Username")
            this.setState({username: event.target.value})
        else if (event.target.placeholder === "Password")
            this.setState({password: event.target.value})
        else if (event.target.placeholder === "E-Mail")
            this.setState({email: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const {cookies} = this.props
        axios.post("http://192.168.0.3:8000/authentication/register/", {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email
        }).then(result => {
            if (result.status === 201) {
                cookies.set("utkn", result.data.token, {sameSite: 'Lax'})
                this.setState({
                    success: true
                })
            }
        }).catch(error => {
            const response = error.response.data;
            const keys = Object.keys(response)
            this.setState({
                errorUserField: keys.includes("user") || keys.includes("username"),
                errorPasswordField: keys.includes("password"),
                errorEmailField: keys.includes("email")
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
                               centered
                        />
                        <Form size='large'
                              error={
                                  this.state.errorUserField ||
                                  this.state.errorPasswordField ||
                                  this.state.errorEmailField
                              }
                              onSubmit={this.handleSubmit}>
                            <Segment raised>
                                <Form.Input
                                    fluid
                                    error={this.state.errorUserField}
                                    icon='user'
                                    iconPosition='left'
                                    placeholder='Username'
                                    type='text'
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                />
                                <Form.Input
                                    fluid
                                    error={this.state.errorPasswordField}
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Password'
                                    type='password'
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                                <Form.Input
                                    fluid
                                    error={this.state.errorEmailField}
                                    icon='mail'
                                    iconPosition='left'
                                    placeholder='E-Mail'
                                    type='email'
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                />
                                <Form.Button
                                    type='submit'
                                    secondary
                                    fluid
                                    size='large'
                                >
                                    Submit
                                </Form.Button>
                                <Message error>
                                    <Message.Header>
                                        Oh no! Please check your data.
                                    </Message.Header>
                                </Message>
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

export default withCookies(SignUpForm);