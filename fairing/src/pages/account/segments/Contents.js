import React, {Component} from 'react';
import {Comment, Grid, Header, Image, Segment} from "semantic-ui-react";
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
     * If no statements are available then the argunaut will tell the user a joke.
     * @returns {JSX.Element}
     */
    render() {
        if (this.props.account.statements.length === 0)
            return <Segment basic textAlign={"center"}>
                <Grid centered>
                    <Grid.Row>
                        <Header as={"h1"}>Seems like deep space!</Header>
                    </Grid.Row>
                    <Grid.Row>
                        <Image
                            src={process.env.REACT_APP_API_URL.concat("/media/account/default/Argunaut.png")}
                            size={"small"}/>
                    </Grid.Row>
                    <Grid.Row>
                        <Header as={"h2"}>Pretty empty here ...</Header>
                    </Grid.Row>
                </Grid>
            </Segment>
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