import React, {Component} from 'react';
import {StatementTemplate} from "../../../components/StatementTemplate";
import {Comment, Segment} from "semantic-ui-react";
import HeadingTemplate from "../../../components/HeadingTemplate";
import {PropTypes} from "prop-types";

class Heading extends Component {
    /**
     * This component requires an parent element (statement) to be shown.
     * @type {{parent: *}}
     */
    static propTypes = {
        parent: PropTypes.object.isRequired
    };

    /**
     * This component shown an parent element of an conversation.
     * Statement can be parent or children. But each child has an parent.
     * This parent is shown in the heading.
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            parent: this.props.parent
        }
    }

    /**
     * This component shows the parent statement.
     * @returns {JSX.Element}
     */
    render() {
        return (
            <HeadingTemplate>
                <Segment style={{maxWidth: "80%"}}>
                    <Comment.Group>
                        <StatementTemplate
                            name={this.props.parent.author.user.username}
                            image={process.env.REACT_APP_API_URL.concat(this.props.parent.author.image)}
                            item={this.state.parent}/>
                    </Comment.Group>
                </Segment>
            </HeadingTemplate>
        );
    }
}

export default Heading;