import React, {Component, createRef} from 'react';
import {Segment} from "semantic-ui-react";
import StickyContentGrid from "../../../../components/StickyContentGrid";
import Following from "../../components/Following";
import Contents from "../../segments/Contents";

class ContentView extends Component {

    /**
     * This component is the content view of the public accounts.
     * Todo: Add comments and proptypes.
     * @param props
     */
    constructor(props) {
        super(props);
        this.contextRef = createRef()
    }

    render() {
        return (
            <Segment vertical style={{zIndex: 0}}>
                <div ref={this.contextRef}>
                    <StickyContentGrid
                        contextRef={this.contextRef}
                        menuOffset={this.props.menuOffset}
                        left={
                            <Segment vertical>
                                <Following following={this.props.account["related_to"]}/>
                            </Segment>
                        }
                        center={
                            <Contents account={this.props.account}/>
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