import React, {Component} from 'react';
import {Header, Image, Segment} from "semantic-ui-react";

class EmptyContentInformation extends Component {
    /**
     * This segment can be shown if there are missing information.
     * @returns {JSX.Element}
     */
    render() {
        return <Segment basic textAlign={"center"}>
            <Header as={"h1"}>Seems like deep space!</Header>
            <Image
                size="small"
                centered
                src={process.env.REACT_APP_API_URL.concat("/media/account/default/Argunaut.png")}
            />
            <Header as={"h2"}>Pretty empty here ...</Header>
        </Segment>
    }
}

export default EmptyContentInformation;