import React, {Component, createRef} from 'react';
import {Segment} from "semantic-ui-react";
import StickyContentGrid from "../../../../components/StickyContentGrid";
import Contents from "../../segments/Contents";
import Following from "../../components/Following";
import Follower from "../../components/Follower";


class ContentView extends Component {
    /**
     * This component is the content view for the private account page.
     * This view has more options then the public account.
     * @param props
     */
    constructor(props) {
        super(props);
        this.contextRef = createRef()
    }

    /**
     * This component shows the statements of the calling private account.
     * Todo: Add side information like follower and follows.
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
                            <Segment vertical>
                                <Following following={this.props.account["related_to"]}/>
                                <Follower follower={this.props.account["related_by"]}/>
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