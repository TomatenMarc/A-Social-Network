import React, {Component, createRef} from 'react';
import {Grid, Image, Segment, Sticky} from "semantic-ui-react";
import StatementInput from "../components/StatementInput";
import _ from "lodash";

const Placeholder = () => <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png'/>

class ContentView extends Component {

    constructor(props) {
        super(props);
        this.contextRef = createRef()
    }

    /**
     * This component is divided into three main columns.
     * The left and right columns can be used to show recommendations or other information.
     * The column in the middle can be used for communication and for showing the contents.
     * @returns {JSX.Element}
     */
    render() {
        return (
            <Segment vertical>
                <div ref={this.contextRef}>
                    <Grid centered columns={3} stackable divided>

                        <Grid.Column only={"computer tablet"}>
                            <Sticky context={this.contextRef} offset={this.props.menuOffset}>
                                <Segment basic>
                                    <Image src='https://react.semantic-ui.com/images/wireframe/image.png'/>
                                </Segment>
                            </Sticky>
                        </Grid.Column>

                        <Grid.Column>
                            <StatementInput context={this.contextRef} offset={this.props.menuOffset}/>
                            {_.times(10, (i) => (
                                <Placeholder key={i}/>
                            ))}
                        </Grid.Column>

                        <Grid.Column only={"computer tablet"}>
                            <Sticky context={this.contextRef} offset={this.props.menuOffset}>
                                <Segment basic>
                                    <Image src='https://react.semantic-ui.com/images/wireframe/image.png'/>
                                </Segment>
                            </Sticky>
                        </Grid.Column>
                    </Grid>
                </div>
            </Segment>
        );
    }
}

export default ContentView;