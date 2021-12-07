import React, { Component } from 'react';
import { Button, Card, Message, Segment, Sticky } from "semantic-ui-react";
import "../../scss/Autocomplete.css"
import { withCookies } from "react-cookie";
import { PropTypes } from "prop-types";
import AutocompleteInput from "./AutocompleteInput";
import { AuthenticationContext } from '../../AuthenticationContext';

class StatementInput extends Component {
    static contextType = AuthenticationContext;

    /**
     * This component needs an offset to stick under the menubar.
     * It also needs a context to reference to the calling element.
     * Furthermore the parent component can provide an closing function
     * if this component can be closed in this context.
     * If this component is used in the context in which an reaction can be added,
     * then must give the reaction relation to the parent as an string to this component.
     * The reaction is an object containing the relation and the parent id.
     * @type {{offset: *, context: *, sticky: *, handleClose: *, reaction: *}}
     */
    static propTypes = {
        offset: PropTypes.number.isRequired,
        context: PropTypes.object.isRequired,
        sticky: PropTypes.bool.isRequired,
        handleClose: PropTypes.func,
        reaction: PropTypes.object,
        updateReactions: PropTypes.func,
        hashtag: PropTypes.string
    };

    /**
     * This component is used to enable the input of statements.
     */
    constructor(props) {
        super(props);
        this.state = {
            accounts: [],
            hashtags: [],
            input: "",
            loading: false,
            error: false,
            maxLength: 120
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkForHashtagUsed = this.checkForHashtagUsed.bind(this);
    }

    /**
     * This handle change of the textarea.
     * It will update the input done by the user.
     * @param event
     */
    handleChange = (event) => {
        event.preventDefault()
        this.setState({
            input: event.target.value
        })
    }

    /**
     * If this component is used in the context of an hashtag observation it must be checked if the
     * input contains the observed hashtag. If the observed hashtag is not present in the input this method will
     * append it at the end.
     * @param input to be checked for the hashtag.
     * @returns {*}
     */
    checkForHashtagUsed = (input) => {
        if (this.props.hashtag) {
            if (input.replaceAll(/#(\w+)/g, " #$1 ").split(" ").map((input, index) => {
                return input === "#" + this.props.hashtag
            }).includes(true))
                return input
            return input.concat(" #" + this.props.hashtag)
        }
        return input
    }

    /**
     * This method handles the input of the user.
     * @param event
     */
    handleSubmit = (event) => {
        event.preventDefault()
        // to prevent double sending
        this.setState({
            input: ""
        })

        if (this.state.input !== "")
            this.context.post(process.env.REACT_APP_API_URL.concat("/accounts/operation/add/statement/"), {
                input: this.checkForHashtagUsed(this.state.input),
                reaction: this.props.reaction
            }, (ev) => {
                const progress = ev.loaded / ev.total * 100;
                console.log(Math.round(progress));
                this.setState({
                    loading: Math.round(progress) < 100
                })
            }).then((res) => {
                if (res.status === 200) {
                    this.setState({
                        input: "",
                        error: false
                    })
                    // if the parent component implements an provides an closing function then
                    // this should be called after sending the input.
                    if (this.props.handleClose)
                        this.props.handleClose()
                    // if there is an function provided to update the reactions of an parent and the validated input
                    // of the backend contains the information vote (indicating) and reaction or an statement itself, then this must be added
                    // to the parent statement to update the content view.
                    if (this.props.updateReactions)
                        this.props.updateReactions(res.data)
                }
            }).catch((error) => {
                this.setState({
                    error: true
                })
            })
    }

    /**
     * This component is a sticky input for statements which can be made by the calling user.
     * The offset of 65 is used because the MenuBar of semantic ui has a magic height of 64.93333...px
     * Furthermore this component can serve several auto-completions like :, @, #.
     * @returns {JSX.Element}
     */
    render() {
        return (
            <Segment basic style={{ padding: 0 }} loading={this.state.loading}>
                <Sticky offset={this.props.offset} context={this.props.context} active={this.props.sticky}>
                    <Card fluid>
                        {
                            this.state.error ?
                                <Card.Content>
                                    <Message
                                        negative
                                        visible={false}
                                        onDismiss={(event) => {
                                            event.preventDefault()
                                            this.setState({
                                                error: false
                                            })
                                        }}>
                                        <Message.Header>Something went wrong!</Message.Header>
                                        <p>Please try again.</p>
                                    </Message>
                                </Card.Content> : null
                        }
                        <Card.Content>
                            {
                                this.props.hashtag ?
                                    <div style={{
                                        fontStyle: "italic"
                                    }}>
                                        Regarding #{this.props.hashtag}
                                    </div> : null
                            }
                            {
                                // if there is a closing function provided by the parent
                                // then there must be an element to close the input.
                                this.props.handleClose ? <Button
                                    style={{
                                        background: "transparent",
                                        border: "none",
                                        padding: 0,
                                        color: "#4183c4",
                                        cursor: "pointer"
                                    }}
                                    onClick={(event) => {
                                        event.preventDefault()
                                        this.props.handleClose()
                                    }}>
                                    Close
                                </Button> : null
                            }
                            <AutocompleteInput
                                input={this.state.input}
                                handleChange={this.handleChange}
                            />
                        </Card.Content>
                        <Card.Content extra>
                            {this.state.maxLength - this.state.input.length} left
                            <Button primary
                                floated='right'
                                disabled={!(this.state.input.length > 0 && this.state.input.length <= this.state.maxLength)}
                                onClick={this.handleSubmit}>
                                Place
                            </Button>
                        </Card.Content>
                    </Card>
                </Sticky>
            </Segment>
        );
    }
}

export default withCookies(StatementInput);