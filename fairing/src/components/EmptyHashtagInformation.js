import React, {Component} from 'react';
import {Header, Image, Segment} from "semantic-ui-react";

class EmptyHashtagInformation extends Component {
    render() {
        return (<Segment basic textAlign={"center"} style={{minHeight: "33vh"}}>
                <Header>Its one small hashtag, ... </Header>
                <Image
                    size="small"
                    centered
                    src={process.env.REACT_APP_API_URL.concat("/media/account/default/Planet.png")}
                />
                <Header>but one giant leap for mankind...</Header>
            </Segment>
        );
    }
}

export default EmptyHashtagInformation;