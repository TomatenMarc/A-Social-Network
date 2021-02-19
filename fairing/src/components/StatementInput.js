import React, {Component} from 'react';
import {Button, Card, Message, Segment, Sticky} from "semantic-ui-react";
import ReactTextareaAutocomplete from "@webscopeio/react-textarea-autocomplete";
import TextareaAutosize from "react-textarea-autosize";
import emoji from "@jukben/emoji-search";
import "../scss/Autocomplete.css"
import {withCookies} from "react-cookie";
import axios from "axios";
import {PropTypes} from "prop-types";

const Emoji = ({entity: {name, char}}) => <div>{`${name}: ${char}`}</div>; // Placeholder for the recommended emojis.
const Item = ({entity: {name}}) => <div>{`${name}`}</div>; // Placeholder for the recommended items.
const Loading = () => <div>Wait</div>; // Placeholder for the waiting of data to be recommended.

//Todo: Make this customizable
class StatementInput extends Component {

    /**
     * This component needs an offset to stick under the menubar.
     * It also needs a context to reference to the calling element.
     * @type {{offset: *, context: *}}
     */
    static propTypes = {
        offset: PropTypes.number.isRequired,
        context: PropTypes.object.isRequired,
        sticky: PropTypes.bool.isRequired,
        closeElement: PropTypes.node // this optional if there is an closing element required. (e.g. in StatementTemplate)
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
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * This method asks the backend for either accounts or hashtags matching a given term.
     * @param term to be looked up.
     * @param filter to be added [account or hashtag].
     */
    handleSearch = (term, filter) => {
        const {cookies} = this.props
        const utkn = cookies.get("utkn")
        if (term !== "" && (filter === "account" || filter === "hashtag"))
            axios.get(process.env.REACT_APP_API_URL.concat("/search/"), {
                headers: {
                    'Authorization': 'Token '.concat(utkn),
                },
                params: {
                    q: term,
                    filter: filter
                }
            }).then(result => {
                if (result.status === 200) {
                    if (filter === "account")
                        this.setState({
                            accounts: result.data.accounts.map(function (result) {
                                return {name: result.user.username}
                            })
                        })
                    if (filter === "hashtag")
                        this.setState({
                            hashtags: result.data.hashtags.map(function (result) {
                                return {name: result.tag}
                            })
                        })
                }
            }).catch(error => {
                this.setState({error: true})
            })
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
     * This method handles the input of the user.
     * @param event
     */
    handleSubmit = (event) => {
        event.preventDefault()
        const {cookies} = this.props
        const utkn = cookies.get("utkn")
        if (this.state.input !== "")
            axios.post(process.env.REACT_APP_API_URL.concat("/accounts/operation/add/statement/"), {
                input: this.state.input
            }, {
                headers: {
                    'Authorization': 'Token '.concat(utkn),
                },
                onUploadProgress: (ev) => {
                    const progress = ev.loaded / ev.total * 100;
                    console.log(Math.round(progress));
                    this.setState({
                        loading: Math.round(progress) < 100
                    })
                }
            }).then((res) => {
                if (res.status === 200) {
                    this.setState({
                        input: "",
                        error: false
                    })
                }
            }).catch((error) => {
                this.setState({
                    error: true
                })
            })
    }

    /**
     * This method filters a list of object regarding their keys to have a matching value.
     * @param list to be filtered
     * @param match the word to be looked up
     * @returns A list of the object in the list having one key matching the search word.
     */
    filterByValue = (list, match) => {
        return list.filter(obj =>
            Object.keys(obj).some(x => obj[x].toLowerCase().includes(match.toLowerCase())));
    }


    /**
     * This component is a sticky input for statements which can be made by the calling user.
     * The offset of 65 is used because the MenuBar of semantic ui has a magic height of 64.93333...px
     * Furthermore this component can serve several auto-completions like :, @, #.
     * @returns {JSX.Element}
     */
    render() {
        return (
            <Segment basic style={{padding: 0}} loading={this.state.loading}>
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
                                // this adds an optional element for closing the statement if it is used for reactions.
                                // Todo: Add function to manipulate the state of the parent if reaction is placed.
                                this.props.closeElement
                            }
                            <ReactTextareaAutocomplete
                                movePopupAsYouType
                                loadingComponent={Loading}
                                textAreaComponent={
                                    TextareaAutosize
                                }
                                onChange={this.handleChange}
                                value={this.state.input}
                                placeholder={"Place your statement!"}
                                style={{resize: "none", margin: "5px 0"}}
                                minChar={0}
                                trigger={{
                                    ":": {
                                        dataProvider: token => {
                                            return emoji(token)
                                                .slice(0, 5)
                                                .map(({name, char}) => ({name, char}));
                                        },
                                        component: Emoji,
                                        output: (item, trigger) => item.char
                                    },
                                    "@": {
                                        dataProvider: token => {
                                            this.handleSearch(token, "account")
                                            return this.filterByValue(this.state.accounts, token)
                                        },
                                        component: Item,
                                        output: (item, trigger) => {
                                            return "@" + item.name
                                        }
                                    },
                                    "#": {
                                        dataProvider: token => {
                                            this.handleSearch(token, "hashtag")
                                            return this.filterByValue(this.state.hashtags, token)
                                        },
                                        component: Item,
                                        output: (item, trigger) => {
                                            return "#" + item.name
                                        }
                                    }
                                }}
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