import React, {Component} from 'react';
import {StatementTemplate} from "../../../components/input/StatementTemplate";
import {Comment, Grid, Segment} from "semantic-ui-react";
import HeadingTemplate from "../../../components/HeadingTemplate";
import {PropTypes} from "prop-types";

class Heading extends Component {
    /**
     * This component requires an parent element (statement) to be shown.
     * Since the reactions can be added in the headed statement one must provide
     * an function to add an element to the parents reactions.
     * @type {{parent: *}}
     */
    static propTypes = {
        parent: PropTypes.object.isRequired,
        updateReactions: PropTypes.func.isRequired
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
                <Segment
                    style={{
                        border: "#6eb1db solid 2px",
                        minWidth: "33%",
                        borderRadius: "10px",
                        margin: "10px"
                    }}>
                    <Grid textAlign='center' verticalAlign='middle'>
                        <Grid.Row>
                            <Comment.Group
                                style={{
                                    margin: "20px"
                                }}>
                                <StatementTemplate
                                    isParent={true}
                                    name={this.props.parent.author.user.username}
                                    image={process.env.REACT_APP_API_URL.concat(this.props.parent.author.image)}
                                    item={this.state.parent}
                                    updateReactions={this.props.updateReactions}
                                />
                            </Comment.Group>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </HeadingTemplate>
        );
    }
}

export default Heading;