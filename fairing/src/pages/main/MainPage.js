import React, {Component, createRef} from 'react';
import Heading from "./segments/Heading";
import SocialExplorer from "./segments/SocialExplorer";
import Footer from "../../components/Footer";
import MenuBar from "../../components/MenuBar";
import AccountExplorer from "./segments/AccountExplorer";
import StatementInput from "./segments/StatementInput";
import {Grid, Header, Image, Segment, Sticky} from "semantic-ui-react";
import _ from "lodash";

const Placeholder = () => <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png'/>

class MainPage extends Component {
    /**
     * This component represents the main page of SolAr.
     * @returns {JSX.Element}
     */
    contextRef = createRef()

    render() {
        return (
            <div>
                <MenuBar/>
                <Heading/>
                <StatementInput/>
                <SocialExplorer/>
                <AccountExplorer/>
                <Segment vertical>
                    <div ref={this.contextRef}>
                        <Grid centered columns={3} stackable divided>

                            <Grid.Column only={"computer tablet"}>
                                <Sticky context={this.contextRef} offset={65 + 68}>
                                    <Header as='h3'>Stuck Content</Header>
                                    <Image src='https://react.semantic-ui.com/images/wireframe/image.png'/>
                                </Sticky>
                            </Grid.Column>

                            <Grid.Column>
                                {_.times(10, (i) => (
                                    <Placeholder key={i}/>
                                ))}
                            </Grid.Column>

                            <Grid.Column only={"computer tablet"}>
                                <Sticky context={this.contextRef} offset={65 + 68}>
                                    <Header as='h3'>Stuck Content</Header>
                                    <Image src='https://react.semantic-ui.com/images/wireframe/image.png'/>
                                </Sticky>
                            </Grid.Column>
                        </Grid>
                    </div>
                </Segment>
                <Footer/>
            </div>
        );
    }
}

export default MainPage;