import React, {Component} from 'react';
import {Container, Header, Image, Label, Segment} from "semantic-ui-react";

class HashtagExplorer extends Component {
    // todo: fill this with life and make it responsive
    /**
     * This component will advertise a trending hashtag.
     * It will show the hashtags, the information regarding this hashtag and three participants.
     * If the user clicks on the hashtag the component will lead to the corresponding hashtag.
     * If the user clicks on one of the three presented users the component will lead to the corresponding account.
     * @returns {JSX.Element}
     */
    render() {
        return (
            <Segment basic textAlign={"center"}>
                <Header as='h3' style={{fontSize: '2em'}}>
                    #Elections
                </Header>
                <p style={{fontSize: '1.33em'}}>What do you think about the US elections 2020?</p>
                <p style={{fontSize: '1em'}}>Argue with <b>150</b> others like:</p>
                <Container>
                    <Label.Group>
                        <Label as='a' color='blue' image>
                            <Image src='https://react.semantic-ui.com/images/avatar/small/veronika.jpg'/>
                            Veronika
                        </Label>
                        <Label as='a' color='teal' image>
                            <Image src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg'/>
                            Jenny
                        </Label>
                        <Label as='a' color='yellow' image>
                            <Image src='https://react.semantic-ui.com/images/avatar/small/christian.jpg'/>
                            Christian
                        </Label>
                    </Label.Group>
                </Container>

            </Segment>
        );
    }
}

export default HashtagExplorer;