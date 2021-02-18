import React, {Component, createRef} from 'react';
import StickyContentGrid from "../../../components/StickyContentGrid";
import {Segment} from "semantic-ui-react";
import Contents from "./Contents";
import {PropTypes} from "prop-types";

class ContentView extends Component {
    /**
     * This component is to enable the observation of statements.
     * Therefore this component needs the parent statement and all regarding information.
     * Furthermore one must provide the magic offset of the menu height as an offset for the sticky content.
     * @type {{parent: *, menuOffset: *}}
     */
    static propTypes = {
        menuOffset: PropTypes.number.isRequired,
        parent: PropTypes.object.isRequired
    };


    /**
     * This component shows the reactions and all information regarding the parent statement to be observed.
     * @param props
     */
    constructor(props) {
        super(props);
        this.contextRef = createRef()
    }

    /**
     * This shows all the reactions and information regarding the parent statement.
     * @returns {JSX.Element}
     */
    render() {
        return (
            <Segment vertical style={{zIndex: 0}}>
                <div ref={this.contextRef}>
                    <StickyContentGrid
                        contextRef={this.contextRef}
                        menuOffset={this.props.menuOffset}
                        left={
                            <div>Pretty empty!</div>
                        }
                        center={
                            <Contents parent={this.props.parent}/>
                        }
                        right={
                            <div>Coming soon!</div>
                        }
                    >
                    </StickyContentGrid>
                </div>
            </Segment>
        );
    }
}

export default ContentView;