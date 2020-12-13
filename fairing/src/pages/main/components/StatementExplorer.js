import React, {Component} from 'react';
import {Button, Container, Header, Image} from "semantic-ui-react";

class StatementExplorer extends Component {
    /**
     * This component will show an random statement of a random user.
     * With this component the social pressure should be taken into account.
     * @returns {JSX.Element}
     */
    render() {
        return (
            <Container>
                <Header as='h3' style={{fontSize: '2em'}}>
                    "I think oven makers are neglected on a veggie day because it doesn't meet their
                    caloric needs"
                </Header>
                <p style={{fontSize: '1.33em'}}>
                    <Image avatar src='https://react.semantic-ui.com/images/avatar/large/nan.jpg'/>
                    <b>Karen0815</b>
                </p>
                <Button.Group>
                    <Button positive icon="smile"
                            label={{as: 'a', basic: true, content: '16'}}
                            labelPosition='left'/>
                    <Button.Or/>
                    <Button negative icon="frown"
                            label={{as: 'a', basic: true, content: '8'}}
                            labelPosition='right'/>
                </Button.Group>
            </Container>
        );
    }
}

export default StatementExplorer;