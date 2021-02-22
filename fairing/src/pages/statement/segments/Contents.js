import React, {Component} from 'react';
import {Comment, Segment} from "semantic-ui-react";
import {StatementTemplate} from "../../../components/input/StatementTemplate";
import {PropTypes} from "prop-types";
import EmptyContentInformation from "../../../components/EmptyContentInformation";

class Contents extends Component {
    /**
     * This component needs the parent element to extract the reactions.
     * Those reactions are statement and can therefore be used with the statement templates.
     * @type {{parent: *}}
     */
    static propTypes = {
        parent: PropTypes.object.isRequired
    };

    /**
     * This component shows the reactions of the parent statement.
     * If there are no statement in the reaction then the empty-content-screen will bee shown.
     * @returns {JSX.Element}
     */
    render() {
        if (this.props.parent["reactions"].length === 0)
            return <EmptyContentInformation/>
        return (
            <Segment basic>
                <Comment.Group>
                    {
                        this.props.parent["reactions"].map((item, index) => {
                            return <StatementTemplate
                                key={index}
                                isParent={false}
                                name={item.child.author.user.username}
                                image={process.env.REACT_APP_API_URL.concat(item.child.author.image)}
                                item={item.child}/>
                        })
                    }
                </Comment.Group>
            </Segment>
        );
    }
}

export default Contents;