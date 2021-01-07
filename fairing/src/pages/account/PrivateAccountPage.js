import React, {Component} from 'react';
import MenuBar from "../../components/MenuBar";
import Avatar from "./segments/Avatar";
import axios from "axios";
import {withCookies} from "react-cookie";
import Networking from "./segments/Networking";
import Footer from "../../components/Footer";
import Contents from "./segments/Contents";

class PrivateAccountPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            account: {},
            loading: true
        }
    }

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
                console.log(this.state.account["related_to"])
            }
        }).catch(error => {
            this.setState({
                loading: true
            })
        })
    }


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