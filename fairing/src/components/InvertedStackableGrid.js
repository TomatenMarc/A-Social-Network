import React, {Component} from 'react';
import {Grid} from "semantic-ui-react";
import {PropTypes} from "prop-types";

class InvertedStackableGrid extends Component {
    /**
     * This component is the inverted stackable grid as it is not provided by semantic ui.
     * This grid is stacked vertically on mobile and horizontally on computer and tablet.
     * Depending on the given elements left, center and right the grid size changes.
     * @type {{left: *, center: *, right: *}}
     */
    static propTypes = {
        left: PropTypes.node,
        center: PropTypes.node,
        right: PropTypes.node
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
                        {this.props.left ? <div style={{margin: 10}}>{this.props.left}</div> : null}
                        {this.props.center ? <div style={{margin: 10}}>{this.props.center}</div> : null}
                        {this.props.right ? <div style={{margin: 10}}>{this.props.right}</div> : null}
                    </div>
                </Grid.Row>
                <Grid.Row centered only={"mobile"}>
                    {this.props.left ? <Grid.Column>{this.props.left}</Grid.Column> : null}
                    {this.props.center ? <Grid.Column>{this.props.center}</Grid.Column> : null}
                    {this.props.right ? <Grid.Column>{this.props.right}</Grid.Column> : null}
                </Grid.Row>
            </Grid>
        );
    }
}

export default InvertedStackableGrid;