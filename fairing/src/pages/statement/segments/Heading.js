import React, {Component} from 'react';
import {StatementTemplate} from "../../../components/StatementTemplate";
import {Comment, Segment} from "semantic-ui-react";
import HeadingTemplate from "../../../components/HeadingTemplate";

class Heading extends Component {
    render() {
        return (
            <HeadingTemplate>
                <Segment style={{maxWidth: "80%"}}>
                    <Comment.Group>
                        <StatementTemplate
                            name={"Peter"}
                            image={process.env.REACT_APP_API_URL.concat("/media/account/default/Argunaut.png")}
                            item={{
                                content: "Hallo Welt! I bims der Argunaut vong dem Planet FooBar",
                                tagged: [],
                                mentioned: []
                            }}/>
                    </Comment.Group>
                </Segment>
            </HeadingTemplate>
        );
    }
}

export default Heading;