import React, {Component} from 'react';
import MenuBar from "../../components/MenuBar";
import Heading from "./segments/Heading";
import {Cookies, withCookies} from "react-cookie";
import axios from "axios";
import {instanceOf, PropTypes} from "prop-types";

class StatementPage extends Component {
    /**
     * This component uses the statement id (sid) in the request to the backend.
     * Furthermore, to get the statement one must have an valid user token.
     * @type {{match: *}}
     */
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired,
        match: PropTypes.shape({
            params: PropTypes.shape({
                sid: PropTypes.string.isRequired
            })
        }),
    };

    /**
     * This component shows an specific statement at the top.
     * Todo: Add children of this statement below.
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            sid: parseInt(props.match.params.sid, 10),
            parent: {},
            loading: true
        }
    }

    /**
     * This method requests the statements data.
     * This data contains an single statement.
     * Todo: Add children of the statement.
     */
    componentDidMount() {
        const {cookies} = this.props
        const utkn = cookies.get("utkn")
        console.log(utkn)
        axios.get(process.env.REACT_APP_API_URL.concat("/contents/statements/get/").concat(this.state.sid).concat("/"),
            {
                headers: {
                    'Authorization': 'Token '.concat(utkn)
                }
            }).then(result => {
            if (result.status === 200) {
                this.setState({
                    parent: result.data[0],
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
     * This component shows an statement as an parent of reactions.
     * If the data is loading then an loading screen is shown.
     * @returns {JSX.Element}
     */
    render() {
        if (this.state.loading)
            return <div>Loading...</div>
        return (
            <div>
                <MenuBar/>
                <Heading parent={this.state.parent}/>
            </div>
        );
    }
}

export default withCookies(StatementPage);