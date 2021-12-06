import React, { Component } from 'react';
import { Form, Grid, Image, Message, Segment } from "semantic-ui-react";
import logo from "../../resources/logo.jpg";
import { NavLink, Redirect } from "react-router-dom";
import { withCookies } from "react-cookie";
import { AuthenticationContext } from "../../AuthenticationContext";

class SignUpForm extends Component {
    static contextType = AuthenticationContext;

    /**
     * This component is for handling the signup of new users.
     * A new user requires a unique username and a valid and unique email.
     * The password is not checked for uniqueness.
     * @param props are used for cookies.
     */
    constructor(props) {
        super(props);
        this.state = {
            success: false,
            username: "",
            password: "",
            email: "",
            errorUserField: false,
            errorMsgUserField: "",
            errorPasswordField: false,
            errorEmailField: false
        }
    }

    /**
     * This method is used to update the state for each change in the corresponding fields.
     * This means the state is updated if the corresponding form field of e.g. the Username is changed.
     * @param event: The event of the input.
     */
    handleChange = (event) => {
        event.preventDefault()
        if (event.target.name === "usernameInput")
            this.setState({ username: event.target.value })
        else if (event.target.name === "passwordInput")
            this.setState({ password: event.target.value })
        else if (event.target.name === "emailInput")
            this.setState({ email: event.target.value })
    }

    /**
     * This method is used to handle the communication with the backend.
     * It will use the cookies to get the authentication token.
     * The data passed to the backend is checked there.
     * Error are returned and shown to the user.
     * @param event: The event of the input.
     */
    handleSubmit = (event) => {
        event.preventDefault();
        this.context.register(this.state.username, this.state.password, this.state.email).then(result => {
            this.setState({ success: result });
        }).catch(error => {
            const response = error.response.data;
            const keys = Object.keys(response)
            this.setState({
                errorUserField: keys.includes("username"),
                errorPasswordField: keys.includes("password"),
                errorEmailField: keys.includes("email")
            })
            this.setState({
                errorMsgUserField: this.state.errorUserField ? response["username"] : "",
                errorMsgPasswordField: this.state.errorPasswordField ? response["password"] : "",
                errorMsgEmailField: this.state.errorEmailField ? response["email"] : ""
            })
        })
    }

    /**
     * This component will redirect to the main page if the sign up was successful.
     * Otherwise the errors will be shown to the user.
     * @returns {JSX.Element}
     */
    render() {
        if (this.state.success)
            return <Redirect to={{ pathname: '/' }} />
        return (
            <div>
                <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: "70%" }}>
                        <Image style={{ maxWidth: "70%", marginBottom: "3em" }}
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
                                    name="usernameInput"
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
                                    name="passwordInput"
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
                                    name="emailInput"
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
                                        Oh no!
                                    </Message.Header>
                                    {
                                        this.state.errorUserField ? <Message.Content>
                                            Username: {this.state.errorMsgUserField}
                                        </Message.Content> : null
                                    }
                                    {
                                        this.state.errorPasswordField ? <Message.Content>
                                            Password: {this.state.errorMsgPasswordField}
                                        </Message.Content> : null
                                    }
                                    {
                                        this.state.errorEmailField ? <Message.Content>
                                            E-Mail: {this.state.errorMsgEmailField}
                                        </Message.Content> : null
                                    }
                                </Message>
                            </Segment>
                        </Form>
                        <Message>
                            Account already setup? <NavLink to="/login">Login!</NavLink>
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default withCookies(SignUpForm);