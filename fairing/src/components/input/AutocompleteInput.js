import React, { Component } from 'react';
import ReactTextareaAutocomplete from "@webscopeio/react-textarea-autocomplete";
import TextareaAutosize from "react-textarea-autosize";
import emoji from "@jukben/emoji-search";
import { PropTypes } from "prop-types";
import { withCookies } from "react-cookie";
import { AuthenticationContext } from '../../AuthenticationContext';

const Emoji = ({ entity: { name, char } }) => <div>{`${name}: ${char}`}</div>; // Placeholder for the recommended emojis.
const Item = ({ entity: { name } }) => <div>{`${name}`}</div>; // Placeholder for the recommended items.
const Loading = () => <div>Wait</div>; // Placeholder for the waiting of data to be recommended.

class AutocompleteInput extends Component {
    static contextType = AuthenticationContext;

    /**
     * This component is a simple autocompletion textarea.
     * The parent component must implement an handleChange method which manipulates the input.
     * Both parts must be added to this component.
     * @type {{input: *, handleChange: *}}
     */
    static propTypes = {
        input: PropTypes.string.isRequired,
        handleChange: PropTypes.func.isRequired
    }

    /**
     * This component queries hashtags and account from the backend while adding text.
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            accounts: [],
            hashtags: [],
            maxLength: 120
        };
        this.handleSearch = this.handleSearch.bind(this);
    }

    /**
     * This method asks the backend for either accounts or hashtags matching a given term.
     * @param term to be looked up.
     * @param filter to be added [account or hashtag].
     */
    handleSearch = (term, filter) => {
        if (term !== "" && (filter === "account" || filter === "hashtag"))
            this.context.get(process.env.REACT_APP_API_URL.concat("/search/"), { q: term, filter: filter }).then(result => {
                if (result.status === 200) {
                    if (filter === "account")
                        this.setState({
                            accounts: result.data.accounts.map(function (result) {
                                return { name: result.user.username }
                            })
                        })
                    if (filter === "hashtag")
                        this.setState({
                            hashtags: result.data.hashtags.map(function (result) {
                                return { name: result.tag }
                            })
                        })
                }
            }).catch(error => {
                // todo: add method to set error of parent component.
                console.log("error")
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
     * This component renders an autocompleting auto-sizing textarea.
     * To add an hashtag one must add an #.
     * To add an mention one must add an @.
     * To add an emoji one must add an :
     * @returns {JSX.Element}
     */
    render() {
        return (
            <ReactTextareaAutocomplete
                movePopupAsYouType
                loadingComponent={Loading}
                textAreaComponent={
                    TextareaAutosize
                }
                onChange={this.props.handleChange}
                value={this.props.input}
                placeholder={"Place your statement!"}
                style={{ resize: "none", margin: "5px 0" }}
                minChar={0}
                trigger={{
                    ":": {
                        dataProvider: token => {
                            return emoji(token)
                                .slice(0, 5)
                                .map(({ name, char }) => ({ name, char }));
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
        );
    }
}

export default withCookies(AutocompleteInput);