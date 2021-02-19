import React, {Component} from 'react';
import {Comment, Segment} from "semantic-ui-react";
import {PropTypes} from "prop-types";
import {StatementTemplate} from "../../../components/StatementTemplate";
import EmptyContentInformation from "../../../components/EmptyContentInformation";

class Contents extends Component {
    /**
     * This component is for the representation of the contents created by the user.
     * @type {{statements: *}}
     */
    static propTypes = {
        account: PropTypes.object.isRequired
    };

    /**
     * This will show the content provided by the corresponding account.
     * If no statements are available then the argunaut will tell the user a joke.
     * @returns {JSX.Element}
     */
    render() {
        if (this.props.account.statements.length === 0)
            return <EmptyContentInformation/>
        return (
            <Segment basic>
                <Comment.Group>
                    {
                        this.props.account["statements"].map((item, index) => {
                            return <StatementTemplate
                                isParent={false}
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