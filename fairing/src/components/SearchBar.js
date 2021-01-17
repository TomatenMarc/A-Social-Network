import React, {Component} from 'react';
import {Search} from "semantic-ui-react";
import axios from "axios";
import {withCookies} from "react-cookie";
import '../scss/Search.css';
import {Link} from "react-router-dom";

class SearchBar extends Component {
    /**
     * This component enables the search for users and hashtags.
     * The amount of shown results is determined by the backend.
     * It will have results stored in the state.
     * By clicking on an result one will be redirected to the account.
     * Todo: Add routing for hashtags.
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            results: {}
        }
    }

    /**
     * This method handles the change of the input while searching.
     * It will send the query string to the backend.
     * Therefore an authentication is required.
     * The results are separated into two parts: accounts and hashtags
     * @param event of typing in the search query.
     * @param data provided by the search input.
     */
    handleChange = (event, data) => {
        event.preventDefault();
        const {cookies} = this.props
        const utkn = cookies.get("utkn")
        if (data.value !== '')
            axios.get("http://192.168.0.3:8000/search/", {
                headers: {
                    'Authorization': 'Token '.concat(utkn),
                },
                params: {
                    q: data.value
                }
            }).then(result => {
                if (result.status === 200) {
                    const res = {}
                    const accounts = result.data.accounts.map(function (result) {
                        return {
                            as: Link,
                            to: "/public/account/".concat(result.user.id),
                            title: result.user.username,
                            image: "http://192.168.0.3:8000".concat(result.image)
                        }
                    })
                    if (accounts.length !== 0)
                        res.accounts = {
                            name: "@",
                            results: accounts
                        }
                    const hashtags = result.data.hashtags.map(function (result) {
                        return {
                            title: result.tag
                        }
                    })
                    if (hashtags.length !== 0)
                        res.hashtags = {
                            name: "#",
                            results: hashtags
                        }
                    this.setState({
                        results: {...res}
                    })
                }
            }).catch(error => {
                console.log(error)
            })
    }

    /**
     * This will show the categories search for querying hashtags and accounts.
     * @returns {JSX.Element}
     */
    render() {
        return (
            <div>
                <Search
                    category
                    onSearchChange={this.handleChange}
                    results={this.state.results}
                />
            </div>
        );
    }
}

export default withCookies(SearchBar);