import React, {Component} from 'react';
import {Grid, Image, Segment} from "semantic-ui-react";
import logo from '../../../resources/logo.jpg'

class Heading extends Component {
    /**
     * This is the heading of the main page.
     * @returns {JSX.Element}
     */
    render() {
        return (
            <Segment inverted style={{padding: '8em 0em'}} vertical>
                <Grid container stackable centered>
                    <Grid.Row>
                        <div className="centered">
                            <Image src={logo} circular size="small"/>
                        </div>
                    </Grid.Row>
                </Grid>
            </Segment>
        );
    }
}

export default Heading;