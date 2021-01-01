import React, {Component} from 'react';
import {Card, Icon, Label, Segment} from "semantic-ui-react";

class Contents extends Component {
    render() {
        return (
            <Segment style={{padding: '0em'}} vertical>
                <Segment basic>
                    <Card.Group centered>
                        {
                            this.props.statements.map((item, index) => {
                                return <Card key={index}>
                                    <Card.Content>
                                        <Card.Meta>Written: A long time ago</Card.Meta>
                                        <Card.Description>
                                            {item.content}
                                            <Label.Group>
                                                <Label size="tiny">
                                                    #Add
                                                </Label>
                                                <Label size="tiny">
                                                    #Hashtags
                                                </Label>
                                            </Label.Group>
                                        </Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <Label color={"green"}>
                                            <Icon name='smile outline'/> 21
                                        </Label>
                                        <Label color={"red"}>
                                            <Icon name='frown outline'/> 23
                                        </Label>
                                        <Label color={"yellow"}>
                                            <Icon name='eye'/> 22
                                        </Label>
                                    </Card.Content>
                                </Card>

                            })
                        }
                    </Card.Group>
                </Segment>
            </Segment>
        );
    }
}

export default Contents;