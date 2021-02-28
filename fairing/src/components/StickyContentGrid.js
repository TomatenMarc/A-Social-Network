import React, {Component} from 'react';
import {Grid, Sticky} from "semantic-ui-react";
import {PropTypes} from "prop-types";

class StickyContentGrid extends Component {

    /**
     * This component is a template for the grid used to show content.
     * The left and right element of this grid is sticky and can be used e.g. for recommendations or information.
     * The center is not sticky but it can be added later for customization.
     * If the middle element should be sticky then this element must use the same context as passed to this template.‚
     * @type {{left: *, contextRef: *, center: *, menuOffset: *, right: *}}
     */
    static propTypes = {
        menuOffset: PropTypes.number.isRequired,
        left: PropTypes.node.isRequired,
        center: PropTypes.node.isRequired,
        right: PropTypes.node.isRequired,
        contextRef: PropTypes.object.isRequired
    };

    /**
     * This is the gird used for the content.
     * The left and right columns are not shown on mobile.
     * @returns {JSX.Element}
     */
    render() {
        return (
            <Grid centered columns={3} stackable divided style={{minHeight: "33vh"}}>
                {/*
                    The following two elements are shown above the center part on mobile view.
                    On mobile the left and right elements are not sticky.
                */}
                <Grid.Column only={"mobile"}>
                    {this.props.left}
                </Grid.Column>

                <Grid.Column only={"mobile"}>
                    {this.props.right}
                </Grid.Column>

                <Grid.Column only={"computer tablet"} style={{maxWidth: "25vw"}}>
                    <Sticky context={this.props.contextRef} offset={this.props.menuOffset}>
                        {this.props.left}
                    </Sticky>
                </Grid.Column>

                <Grid.Column style={{minWidth: "50vw"}}>
                    {this.props.center}
                </Grid.Column>

                <Grid.Column only={"computer tablet"} style={{maxWidth: "25vw"}}>
                    <Sticky context={this.props.contextRef} offset={this.props.menuOffset}>
                        {this.props.right}
                    </Sticky>
                </Grid.Column>
            </Grid>
        );
    }
}

export default StickyContentGrid;