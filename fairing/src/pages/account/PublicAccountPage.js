import React, {Component} from 'react';
import axios from "axios";

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
        axios.get("http://192.168.0.3:8000/accounts/show/".concat(this.state.uid).concat("/"), {}
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
                Private Account of {this.state.account.user.username}!
            </div>
        );
    }
}

export default PublicAccountPage;