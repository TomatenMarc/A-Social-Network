import React, { Component } from 'react';
import MenuBar from "../../components/MenuBar";
import Heading from "./segments/Heading";
import { withCookies } from "react-cookie";
import { PropTypes } from "prop-types";
import ContentView from "./segments/ContentView";
import Footer from "../../components/Footer";
import { AuthenticationContext } from "../../AuthenticationContext";

class StatementPage extends Component {
    static contextType = AuthenticationContext;

    /**
     * This component uses the statement id (sid) in the request to the backend.
     * Furthermore, to get the statement one must have an valid user token.
     * @type {{match: *}}
     */
    static propTypes = {
        match: PropTypes.shape({
            params: PropTypes.shape({
                sid: PropTypes.string.isRequired
            })
        }),
    };

    /**
     * This component shows an specific statement at the top.
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            sid: parseInt(props.match.params.sid, 10),
            parent: {},
            loading: true
        }
        this.updateReactions = this.updateReactions.bind(this);
    }

    /**
     * This method requests the statements data.
     * This data contains an single statement.
     * Todo: Add children of the statement.
     */
    componentDidMount() {
        this.context.get(process.env.REACT_APP_API_URL.concat("/contents/statements/get/").concat(this.state.sid).concat("/")).then(result => {
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
     * This methods updates the reactions regarding an statement.
     * Therefore not each reaction must be reload if one adds an reaction.
     * For update all reaction one can refresh the window.
     * @param reaction (object) to be added to the reactions of the parent.
     */
    updateReactions = (reaction) => {
        let parent = { ...this.state.parent }
        parent["reactions"] = [reaction].concat(parent["reactions"])
        this.setState({ parent })
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
                <MenuBar />
                <Heading
                    updateReactions={this.updateReactions}
                    parent={this.state.parent} />
                <ContentView menuOffset={65}
                    parent={this.state.parent} />
                <Footer />
            </div>
        );
    }
}

export default withCookies(StatementPage);