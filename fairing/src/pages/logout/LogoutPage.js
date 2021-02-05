import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import {withCookies} from "react-cookie";
import axios from "axios";

class LogoutPage extends Component {
    /**
     * This component can be used for logout.
     * It only uses the /logout route. Therefore the component must be used along with a private route.
     * This will ensure that the utkn is usable and is used for the logout.
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    /**
     * This method calls the logout route with the corresponding utkn.
     * The utkn must be provided and valid.
     * To ensure an valid token this component must be called in the context of an private route.
     * Those private routes will validate the token before connection to this component.
     */
    componentDidMount() {
        const {cookies} = this.props
        const utkn = cookies.get("utkn");
        axios.post(process.env.REACT_APP_API_URL.concat("/authentication/logout/"), {}, {
            headers: {
                'Authorization': 'Token '.concat(utkn)
            }
        }).then(result => {
            if (result.status === 200) {
                console.log("Hey")
                cookies.remove("utkn")
            }
        }).then(() => {
            setTimeout(function () {
                this.setState({
                    loading: false
                })
            })
        })
    }

    /**
     * This method will redirect to the login if the logout was successful.
     * Otherwise this will show a goodbye-screen.
     * @returns {JSX.Element}
     */
    render() {
        if (this.state.loading) {
            return (
                <div>Goodbying</div>
            )
        }
        return <Redirect to={"/login"}/>;
    }
}

export default withCookies(LogoutPage);