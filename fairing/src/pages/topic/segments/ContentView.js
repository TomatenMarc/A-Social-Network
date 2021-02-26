import React, {Component, createRef} from 'react';
import {Segment} from "semantic-ui-react";
import StickyContentGrid from "../../../components/StickyContentGrid";
import {PropTypes} from "prop-types";
import Contents from "./Contents";
import StatementInput from "../../../components/input/StatementInput";

class ContentView extends Component {
    /**
     * This component needs the menuOffset since it uses an sticky input.
     * Furthermore this component needs an function to update the reactions to the particular hashtag.
     * @type {{menuOffset: *, updateReactions: *}}
     */
    static propTypes = {
        menuOffset: PropTypes.number.isRequired,
        updateReactions: PropTypes.func.isRequired
    };

    /**
     * This components provides an context reference for the stick input.
     * @param props
     */
    constructor(props) {
        super(props);
        this.contextRef = createRef()
    }

    /**
     * This shows the component.
     * @returns {JSX.Element}
     */
    render() {
        return (
            <Segment vertical style={{zIndex: 0}}>
                <div ref={this.contextRef}>
                    <StickyContentGrid
                        menuOffset={this.props.menuOffset}
                        left={<div>left</div>}
                        center={
                            <div>
                                <StatementInput
                                    updateReactions={this.props.updateReactions}
                                    sticky={true}
                                    context={this.contextRef}
                                    offset={this.props.menuOffset}/>
                                <Contents results={this.props.results}/>
                            </div>
                        }
                        right={<div>right</div>}
                        contextRef={this.contextRef}/>
                </div>
            </Segment>
        );
    }
}

export default ContentView;