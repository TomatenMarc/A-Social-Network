import React, {Component} from 'react';
import axios from "axios";
import MenuBar from "../../../components/MenuBar";
import Avatar from "../segments/Avatar";
import {Cookies, withCookies} from "react-cookie";
import {instanceOf, PropTypes} from "prop-types";
import Footer from "../../../components/Footer";
import {Redirect} from "react-router-dom";
import ContentView from "./components/ContentView";

class PublicAccountPage extends Component {
    /**
     * This component can be used to display a public account.
     * Therefore an uid the requested user is required.
     * This uid should be taken from the url.
     * If one calls his own public account one will be redirected to the private account.
     * @type {{cookies: Validator<NonNullable<Cookies>>}}
     */
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired,
        match: PropTypes.shape({
            params: PropTypes.shape({
                uid: PropTypes.string.isRequired
            })
        }),
    };

    /**
     * This component needs the match parameters from the url to get the uid of the requested user.
     * It will provide the account as well as an loading state.
     * @param props The match parameters of the url to get the uid of the requested user.
     */
    constructor(props) {
        super(props);
        this.state = {
            uid: parseInt(props.match.params.uid, 10),
            account: [],
            loading: true,
            menuHeight: 65
        }
    }

    /**
     * This method will get all public data according the requested user form the backend.
     * Therefore the user token from the cookies is required.
     */
    componentDidMount() {
        //todo: show an error page if the requested user does not exist.
        const {cookies} = this.props
        const utkn = cookies.get("utkn")
        axios.get(process.env.REACT_APP_API_URL.concat("/accounts/show/").concat(this.state.uid).concat("/"), {
                headers: {
                    'Authorization': 'Token '.concat(utkn)
                }
            }
        ).then(result => {
            if (result.status === 200) {
                this.setState({
                    account: result.data[0],
                    loading: false
                })
            }
        }).catch(error => {
            this.setState({
                loading: true
            })
        })
    }

    /**
     * While pulling the user data a loading screen is shown.
     * Afterwards the public account of the requested user is shown.
     * If the current user calls his own public account he will be redirected to his private account.
     * @returns {JSX.Element}
     */
    render() {
        if (this.state.loading)
            return <div>
                Fetching ...
            </div>
        if (this.state.account["self_request"])
            return <Redirect to={{pathname: '/account'}}/>
        return (
            <div>
                <MenuBar/>
                <Avatar
                    forPublicUse={true}
                    uid={this.state.uid}
                    friend={this.state.account["is_friend"]}
                    image={process.env.REACT_APP_API_URL.concat(this.state.account.image)}
                    username={this.state.account.user.username}
                    biography={this.state.account.biography}
                />
                <ContentView
                    menuOffset={this.state.menuHeight}
                    account={this.state.account}/>
                <Footer/>
            </div>
        );
    }
}

export default withCookies(PublicAccountPage);