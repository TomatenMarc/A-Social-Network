import React, {Component} from 'react';
import {Input, Segment} from "semantic-ui-react";
import StickyOverlay from "../../../components/StickyOverlay";


class StatementInput extends Component {
    /**
     * This component is a sticky input for statements which can be made by the calling user.
     * The offset of 65 is used because the MenuBar of semantic ui has a magic height of 64.93333...px
     * @returns {JSX.Element}
     */
    render() {
        return (
            <Segment basic style={{padding: 0}}>
                <StickyOverlay offset={65}>
                    <Segment>
                        <Input fluid placeholder={"Whats up ..."}/>
                    </Segment>
                </StickyOverlay>
            </Segment>
        );
    }
}

export default StatementInput;