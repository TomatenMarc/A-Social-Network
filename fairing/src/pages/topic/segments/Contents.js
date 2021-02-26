import React, {Component} from 'react';
import EmptyContentInformation from "../../../components/EmptyContentInformation";
import {Comment, List, Segment, Transition} from "semantic-ui-react";
import {StatementTemplate} from "../../../components/input/StatementTemplate";
import {PropTypes} from "prop-types";

class Contents extends Component {
    /**
     * This component is for showing every statement or reaction containing the observed hashtag.
     * Therefore the topic page must provide the data of all statements containing this hashtag.
     * @type {{results: *}}
     */
    static propTypes = {
        results: PropTypes.object.isRequired
    }

    /**
     * This component shows each statement and reactions to the observed hashtag.
     * @returns {JSX.Element}
     */
    render() {
        if (this.props.results.data.length === 0)
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
                        {
                            this.props.results.data.sort(function (a, b) {
                                return a.id > b.id // ids are representative for timestamps
                            }).map((item, index) => {
                                return <List.Item key={index}>
                                    <StatementTemplate
                                        isParent={false}
                                        key={index}
                                        name={item.author.user.username}
                                        image={process.env.REACT_APP_API_URL.concat(item.author.image)}
                                        item={item}/>
                                </List.Item>
                            }).reverse()
                        }
                    </Transition.Group>
                </Comment.Group>
            </Segment>
        );
    }
}

export default Contents;