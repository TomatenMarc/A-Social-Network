import React, {Component, createRef} from 'react';
import {Image, Segment} from "semantic-ui-react";
import StatementInput from "../../../components/input/StatementInput";
import StickyContentGrid from "../../../components/StickyContentGrid";
import {PropTypes} from "prop-types";
import Contents from "./Contents";

class ContentView extends Component {

    /**
     * This component is the content view of the main page.
     * Notice: The view must provide a context for the sticky elements in the grid.
     * Also the middle element does not contain a stick element for customization purpose.
     * This component also passes the results of the statement feed down to the content view.
     * @type {{menuOffset: *}}
     */
    static propTypes = {
        menuOffset: PropTypes.number.isRequired,
        results: PropTypes.object.isRequired,
        updateReactions: PropTypes.func.isRequired
    };

    /**
     * This component is for the content at the main page.
     * The content grid contains sticky elements.
     * Therefore a context must be provided.
     * @param props
     */
    constructor(props) {
        super(props);
        this.contextRef = createRef()
    }

    /**
     * This component is divided into three main columns.
     * The left and right columns can be used to show recommendations or other information.
     * They are sticky.
     * The column in the middle can be used for communication and for showing the contents.
     * The StatementInput contains a sticky element. Under this is the content.
     * Because of the sticky input the content gets scrollable.
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
                            <Segment basic>
                                <Image src='https://react.semantic-ui.com/images/wireframe/image.png'/>
                            </Segment>
                        }
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
                        right={
                            <Segment basic>
                                <Image src='https://react.semantic-ui.com/images/wireframe/image.png'/>
                            </Segment>
                        }
                    >
                    </StickyContentGrid>
                </div>
            </Segment>
        );
    }
}

export default ContentView;