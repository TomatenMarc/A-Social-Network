import React, {Component} from 'react';
import {Comment, Segment} from "semantic-ui-react";
import {PropTypes} from "prop-types";
import {StatementTemplate} from "../../../components/StatementTemplate";

class Contents extends Component {
    /**
     * This component is for the representation of the contents created by the user.
     * Todo: Use a responsive design to show the content.
     * Todo: The content itself must be an own component, they must handle mentions and hashtags.
     * @type {{statements: *}}
     */
    static propTypes = {
        account: PropTypes.object.isRequired
    };

    /**
     * This will show the content provided by the corresponding account.
     * @returns {JSX.Element}
     */
    render() {
        if (this.props.account.statements.length === 0)
            return null
        return (
            <Segment basic>
                <Comment.Group>
                    {
                        this.props.account["statements"].map((item, index) => {
                            return <StatementTemplate
                                key={index}
                                name={this.props.account.user.username}
                                image={process.env.REACT_APP_API_URL.concat(this.props.account.image)}
                                item={item}/>
                        })
                    }
                </Comment.Group>
            </Segment>
        );
    }
}

export default Contents;