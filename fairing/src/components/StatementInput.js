import React, {Component} from 'react';
import {Button, Card, Segment, Sticky} from "semantic-ui-react";
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
        context: PropTypes.object.isRequired
    };

    /**
     * This component is used to enable the input of statements.
     */
    constructor(props) {
        super(props);
        this.state = {
            accounts: [],
            hashtags: []
        };
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
                console.log(error)
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
            <Segment basic style={{padding: 0}}>
                <Sticky offset={this.props.offset} context={this.props.context}>
                    <Card fluid>
                        <Card.Content>
                            <ReactTextareaAutocomplete
                                movePopupAsYouType
                                loadingComponent={Loading}
                                textAreaComponent={
                                    TextareaAutosize
                                }
                                placeholder={"What's up out there?"}
                                style={{resize: "none"}}
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
                            <Button primary floated='right'>Place</Button>
                        </Card.Content>
                    </Card>
                </Sticky>
            </Segment>
        );
    }
}

export default withCookies(StatementInput);