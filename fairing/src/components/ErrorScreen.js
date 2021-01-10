import React, {Component} from 'react';
import {Grid, Header} from "semantic-ui-react";
import '../scss/Error.css'
import '../scss/Positioning.css'

class ErrorScreen extends Component {
    /**
     * This component is the error screen which is shown after an error occured.
     * @returns {JSX.Element}
     */
    render() {
        return (
            <div style={{
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                margin: 0,
                boxSizing: "border-box",
                width: "100%",
                height: "100%",
                objectFit: "contain",
                background: "#1a1a1a"
            }}>
                <Grid textAlign='center' style={{height: '100vh'}} verticalAlign='middle'>
                    <Grid.Row style={{maxWidth: "50%", paddingLeft: "5%"}}>
                        <Header as="h1" inverted>
                            Houston, we have a problem!
                        </Header>
                    </Grid.Row>
                    <Grid.Row style={{maxWidth: "50%"}}>
                        <div className="planet">
                            <div className="r1"/>
                            <div className="r2"/>
                            <div className="r3"/>
                            <div className="r4"/>
                            <div className="r5"/>
                            <div className="shadow"/>
                        </div>
                    </Grid.Row>
                    <Grid.Row style={{minHeight: "50%"}}>
                        <div className="floatInSpaceAnimation">
                            <div className="astronaut">
                                <div className="helmet">
                                    <div className="glass">
                                        <div className="shine"/>
                                    </div>
                                </div>
                                <div className="dress">
                                    <div className="animatedArmRight">
                                        <div className="armRight"/>
                                    </div>

                                    <div className="armLeft"/>
                                    <div className="plate">
                                        <div className="console"/>
                                        <div className="b1"/>
                                        <div className="b2"/>
                                        <div className="b3"/>
                                    </div>
                                </div>
                                <div className="belt">
                                    <div className="boxLeft"/>
                                    <div className="boxRight"/>
                                </div>
                                <div className="animatedLegLeft">
                                    <div className="legLeft"/>
                                </div>
                                <div className="legRight"/>
                            </div>
                        </div>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

export default ErrorScreen;