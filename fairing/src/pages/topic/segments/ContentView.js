import React, {Component, createRef} from 'react';
import {Segment} from "semantic-ui-react";
import StickyContentGrid from "../../../components/StickyContentGrid";
import {PropTypes} from "prop-types";

class ContentView extends Component {
    static propTypes = {
        menuOffset: PropTypes.number.isRequired
    };

    constructor(props) {
        super(props);
        this.contextRef = createRef()
    }

    render() {
        return (
            <Segment vertical style={{zIndex: 0}}>
                <div ref={this.contextRef}>
                    <StickyContentGrid
                        menuOffset={this.props.menuOffset}
                        left={<div>left</div>}
                        center={<div>middle</div>}
                        right={<div>right</div>}
                        contextRef={this.contextRef}/>
                </div>
            </Segment>
        );
    }
}

export default ContentView;