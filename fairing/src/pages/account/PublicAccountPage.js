import React, {Component} from 'react';
import axios from "axios";
import MenuBar from "../../components/MenuBar";
import Avatar from "./segments/Avatar";
import Contents from "./segments/Contents";
import Networking from "./segments/Networking";
import {withCookies} from "react-cookie";

class PublicAccountPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uid: props.match.params.uid,
            account: [],
            loading: true
        }
    }

    componentDidMount() {
        const {cookies} = this.props
        const utkn = cookies.get("utkn")
        axios.get("http://192.168.0.3:8000/accounts/show/".concat(this.state.uid).concat("/"), {
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
                console.log(this.state)
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
                    private={false}
                    uid={this.state.uid}
                    friend={this.state.account["is_friend"]}
                    image={"http://192.168.0.3:8000".concat(this.state.account.image)}
                    username={this.state.account.user.username}
                    biography={this.state.account.biography}
                />
                <Networking private={true}
                            following={this.state.account["related_to"]}/>
                <Contents statements={this.state.account["statements"]}/>
            </div>
        );
    }
}

export default withCookies(PublicAccountPage);