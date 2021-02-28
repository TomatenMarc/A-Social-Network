import React, {Component} from 'react';
import {Image, Segment} from "semantic-ui-react";
import _ from "lodash";

const Placeholder = () => <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png'/>

class Contents extends Component {
    /**
     * This component shows all actions of the accounts the calling account is following.
     * Here one can state an position and see others actions.
     * @returns {JSX.Element}
     */
    render() {
        return (
            <Segment>
                {_.times(10, (i) => (
                    <Placeholder key={i}/>
                ))}
            </Segment>
        );
    }
}

export default Contents;