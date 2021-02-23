import React, {Component} from 'react';
import {Comment, List, Segment, Transition} from "semantic-ui-react";
import {PropTypes} from "prop-types";
import EmptyContentInformation from "../../../components/EmptyContentInformation";
import {StatementTemplate} from "../../../components/input/StatementTemplate";

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
                    <Transition.Group
                        as={List}
                        animation={"drop"}
                        duration={500}
                        divided
                    >
                        { // todo: find other ways to animate the first element without sorting and reversing
                            this.props.parent["reactions"].sort(function (a, b) {
                                return a.id > b.id // ids are representative for timestamps
                            }).map((item, index) => {
                                return <List.Item key={index}>
                                    <StatementTemplate
                                        key={index}
                                        isParent={false}
                                        name={item.child.author.user.username}
                                        image={process.env.REACT_APP_API_URL.concat(item.child.author.image)}
                                        item={item.child}
                                        reaction={item.vote}
                                    />
                                </List.Item>
                            }).reverse()//to reverse the animation.
                        }
                    </Transition.Group>
                </Comment.Group>
            </Segment>
        );
    }
}

export default Contents;