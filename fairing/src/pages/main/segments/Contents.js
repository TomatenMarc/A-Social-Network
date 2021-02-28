import React, {Component} from 'react';
import {Comment, List, Segment, Transition} from "semantic-ui-react";
import {PropTypes} from "prop-types";
import EmptyContentInformation from "../../../components/EmptyContentInformation";
import {StatementTemplate} from "../../../components/input/StatementTemplate";

class Contents extends Component {

    /**
     * This component renders the results of the statement feed.
     * Therefore those results need to be added to this component.
     * @type {{results: *}}
     */
    static propTypes = {
        results: PropTypes.object.isRequired
    };

    /**
     * This component shows all actions of the accounts the calling account is following.
     * Here one can state an position and see others actions.
     * @returns {JSX.Element}
     */
    render() {
        if (this.props.results.length === 0)
            return <EmptyContentInformation/>
        return (
            <Segment>
                <Comment.Group style={{minWidth: "100%"}}>
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