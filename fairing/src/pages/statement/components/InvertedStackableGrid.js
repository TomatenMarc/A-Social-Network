import React, {Component} from 'react';
import {Grid} from "semantic-ui-react";
import {PropTypes} from "prop-types";

class InvertedStackableGrid extends Component {
    /**
     * This component is the inverted stackable grid as it is not provided by semantic ui.
     * This grid is stacked vertically on mobile and horizontally on computer and tablet.
     * @type {{left: *, center: *, right: *}}
     */
    static propTypes = {
        left: PropTypes.node.isRequired,
        center: PropTypes.node.isRequired,
        right: PropTypes.node.isRequired
    }

    /**
     * This shows the inverted stackable grid.
     * @returns {JSX.Element}
     */
    render() {
        return (
            <Grid columns='equal' padded relaxed>
                <Grid.Row centered only={"computer tablet"}>
                    <div>
                        <div style={{margin: 10}}>{this.props.left}</div>
                        <div style={{margin: 10}}>{this.props.center}</div>
                        <div style={{margin: 10}}>{this.props.right}</div>
                    </div>
                </Grid.Row>
                <Grid.Row centered only={"mobile"}>
                    <Grid.Column>{this.props.left}</Grid.Column>
                    <Grid.Column>{this.props.center}</Grid.Column>
                    <Grid.Column>{this.props.right}</Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

export default InvertedStackableGrid;