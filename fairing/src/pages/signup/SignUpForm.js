import React, {Component} from 'react';
import {Form, Grid, Image, Message, Segment} from "semantic-ui-react";
import logo from "../../resources/logo.jpg";
import {NavLink, Redirect} from "react-router-dom";

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            success: false,
            username: "",
            password: "",
            email: ""
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
        this.setState({
            success: true
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
                                <Form.Input
                                    fluid
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