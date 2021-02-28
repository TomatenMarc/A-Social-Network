import React, {Component} from 'react';
import {Button, Card, Header, Image, Label, Segment} from "semantic-ui-react";

class StatementExplorer extends Component {
    // todo: fill this with life and make it responsive
    selections = [
        /**
         * These are example selection.
         */
        {
            user: {
                username: "Nan",
                avatar: "https://react.semantic-ui.com/images/avatar/large/nan.jpg"
            },
            statement: {
                text: "I think oven makers are neglected on a veggie day because it doesn't meet their caloric needs",
                likes: 16,
                dislikes: 10,
                hashtags: ["Ovens", "NoVeggie"]
            }
        },
        {
            user: {
                username: "Veronika",
                avatar: "https://react.semantic-ui.com/images/avatar/large/veronika.jpg"
            },
            statement: {
                text: "In my opinions we should get a cute and fluffy dog, because dogs are man's best friends",
                likes: 42,
                dislikes: 38,
                hashtags: ["dog", "noCats", "BestFriends"]
            }
        },
        {
            user: {
                username: "Christian",
                avatar: "https://react.semantic-ui.com/images/avatar/large/christian.jpg"
            },
            statement: {
                text: "My point is that we should be building less debt because we are living beyond our means.",
                likes: 10,
                dislikes: 38,
                hashtags: ["living", "future", "capitalism"]
            }
        }
    ]

    /**
     * This component will show an random statement of a random user.
     * With this component the social pressure should be taken into account.
     * @returns {JSX.Element}
     */

    constructor(props) {
        super(props);
        this.state = {
            voted: false,
            selectionIndex: 0
        }
        this.vote = this.vote.bind(this)
    }

    vote = (mode) => {
        /**
         * This method adds a vote to a given statement.
         * @type {{valueOf(): boolean}}
         */

        let voted = {...this.state.voted}
        if (mode === "up") {
            this.selections[this.state.selectionIndex].statement.likes = this.selections[this.state.selectionIndex].statement.likes + 1;
            voted = true;
        } else if (mode === "down") {
            this.selections[this.state.selectionIndex].statement.dislikes = this.selections[this.state.selectionIndex].statement.dislikes + 1;
            voted = true;
        }
        this.setState({voted})
        setTimeout(this.nextSelection, 1000)
    }

    nextSelection = () => {
        this.setState({
            voted: false,
            selectionIndex: (this.state.selectionIndex + 1) % this.selections.length
        })

    }

    render() {
        return (
            <Segment basic textAlign={"center"}>
                <Header as="h1">
                    What do you think?
                </Header>
                <Card.Group>
                    <Card fluid color='grey' style={{boxShadow: "none"}}>
                        <Card.Content>
                            <Image
                                floated='left'
                                size='mini'
                                src={this.selections[this.state.selectionIndex].user.avatar}
                            />
                            <Card.Header
                                textAlign="left">{this.selections[this.state.selectionIndex].user.username}</Card.Header>
                            <Card.Meta textAlign="left">Says:</Card.Meta>
                            <Card.Description as="h3">
                                {this.selections[this.state.selectionIndex].statement.text}
                            </Card.Description>
                        </Card.Content>
                        <Label.Group>
                            {this.selections[this.state.selectionIndex].statement.hashtags.map((hashtag, index) => (
                                <Label key={index} size="tiny">{
                                    '#' + hashtag
                                }</Label>
                            ))}
                        </Label.Group>
                        <Card.Content extra>
                            <Button.Group>
                                <Button positive icon="smile"
                                        disabled={this.state.voted}
                                        label={{
                                            as: 'a',
                                            basic: true,
                                            content: this.selections[this.state.selectionIndex].statement.likes
                                        }}
                                        labelPosition='left'
                                        onClick={() => this.vote("up")}
                                />
                                <Button.Or/>
                                <Button negative icon="frown"
                                        disabled={this.state.voted}
                                        label={{
                                            as: 'a',
                                            basic: true,
                                            content: this.selections[this.state.selectionIndex].statement.dislikes
                                        }}
                                        labelPosition='right'
                                        onClick={() => this.vote("down")}
                                />
                            </Button.Group>
                        </Card.Content>
                    </Card>
                </Card.Group>

            </Segment>
        );
    }
}

export default StatementExplorer;