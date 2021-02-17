import React, {Component} from 'react';
import {Grid, Segment} from "semantic-ui-react";

class HeadingTemplate extends Component {
    /**
     * This is the generalized template for the headings used in this project.
     * @returns {JSX.Element}
     */
    render() {
        return (
            <Segment inverted style={{padding: '8em 0em'}} vertical>
                <Grid textAlign='center' verticalAlign='middle' stackable>
                    <Grid.Row>
                        {this.props.children}
                    </Grid.Row>
                </Grid>
            </Segment>
        );
    }
}

export default HeadingTemplate;