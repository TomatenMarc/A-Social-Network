import React, {Component} from 'react';
import MenuBar from "../../components/MenuBar";
import Avatar from "./segments/Avatar";
import axios from "axios";
import {Cookies, withCookies} from "react-cookie";
import Networking from "./segments/Networking";
import Footer from "../../components/Footer";
import Contents from "./segments/Contents";
import {instanceOf} from "prop-types";

class PrivateAccountPage extends Component {
    /**
     * This component is for representing an private account.
     * todo: This should add modification options for the calling user.
     * @type {{cookies: Validator<NonNullable<Cookies>>}}
     */
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired,
    };

    /**
     * This component will provide an account as well an loading screen.
     * It will also need to have cookies to work with the user token.
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            account: {},
            loading: true
        }
    }

    /**
     * This method pulls the data of the calling user after the component did mount.
     * The calling account is identified by the user-token.
     */
    componentDidMount() {
        const {cookies} = this.props
        const utkn = cookies.get("utkn")
        axios.get("http://192.168.0.3:8000/accounts/own/", {
            headers: {
                'Authorization': 'Token '.concat(utkn)
            }
        }).then(result => {
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
     * While the data is loaded a loading screen will be shown.
     * After loading the account will be displayed.
     * @returns {JSX.Element}
     */
    render() {
        if (this.state.loading)
            return <div>
                Fetching ...
            </div>
        return (
            <div>
                <MenuBar/>
                <Avatar
                    private={true}
                    image={"http://192.168.0.3:8000".concat(this.state.account.image)}
                    username={this.state.account.user.username}
                    biography={this.state.account.biography}
                />
                <Networking private={false}
                            follower={this.state.account["related_by"]}
                            following={this.state.account["related_to"]}/>
                <Contents statements={this.state.account["statements"]}/>
                <Footer/>
            </div>
        );
    }
}

export default withCookies(PrivateAccountPage);