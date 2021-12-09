import React, { Component } from 'react';
import { Comment, List, Segment, Transition } from "semantic-ui-react";
import { PropTypes } from "prop-types";
import EmptyContentInformation from "../../../components/EmptyContentInformation";
import { StatementTemplate } from "../../../components/input/StatementTemplate";

class Contents extends Component {

    /**
     * This component renders the results of the statement feed.
     * Therefore those results need to be added to this component.
     * @type {{results: *}}
     */
    static propTypes = {
        results: PropTypes.array.isRequired,
        children: PropTypes.node
    };


    /**
     * This component shows all actions of the accounts the calling account is following.
     * Here one can state an position and see others actions.
     * @returns {JSX.Element}
     */
    render() {
        if (this.props.results.data.length === 0)
            return <EmptyContentInformation />

        //sort the data by id reversed
        const data = this.props.results.data.sort((a, b) => {
            return a.id > b.id ? -1 : 1;
        });

        return (
            <Segment>
                <Comment.Group style={{ minWidth: "100%" }}>
                    <Transition.Group
                        as={List}
                        animation={"drop"}
                        duration={500}
                        divided
                    >
                        {
                            data.map((item, index) => {
                                return <List.Item key={index}>
                                    <StatementTemplate
                                        isParent={false}
                                        key={index}
                                        name={item.author.user.username}
                                        image={process.env.REACT_APP_API_URL.concat(item.author.image)}
                                        item={item} />
                                </List.Item>
                            })
                        }
                        {
                            this.props.children
                        }
                    </Transition.Group>
                </Comment.Group>
            </Segment>
        );
    }
}

export default Contents;