import React, {Component} from 'react';
import {Button, Form, Segment, Sticky} from "semantic-ui-react";
import ContentEditable from "react-contenteditable";


class StatementInput extends Component {
    constructor() {
        super();
        this.contentEditable = React.createRef();
        this.state = {
            html: "Whats up?"
        };
    }

    handleChange = evt => {
        this.setState({html: evt.target.value});
        console.log(this.state.html)
    };

    /**
     * This component is a sticky input for statements which can be made by the calling user.
     * The offset of 65 is used because the MenuBar of semantic ui has a magic height of 64.93333...px
     * @returns {JSX.Element}
     */
    render() {
        return (
            <Segment basic style={{padding: 0}}>
                <Sticky offset={this.props.offset} context={this.props.context}>
                    <Segment>
                        <Form reply>
                            <Form.Input name="StatementInput"
                                        rows={1}
                                        control={ContentEditable}
                                        html={this.state.html}
                                        disabled={false}
                                        onChange={this.handleChange}
                                        style={{
                                            outline: "none",
                                            resize: "none",
                                            overflow: "auto"
                                        }}>
                            </Form.Input>
                            <Button
                                content='Go'
                                labelPosition='left'
                                icon='paper plane'
                                primary
                            />
                        </Form>
                    </Segment>
                </Sticky>
            </Segment>
        );
    }
}

export default StatementInput;