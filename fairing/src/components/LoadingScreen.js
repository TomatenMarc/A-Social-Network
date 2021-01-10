import React, {Component} from 'react';
import '../scss/Loading.css'
import '../scss/Slider.css'
import {Grid, Header} from "semantic-ui-react";

class LoadingScreen extends Component {
    /**
     * This is the loading-screen used for transitions between validating the token in the backend and loading the
     * requested component.
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
                    <Grid.Column style={{maxWidth: "70%"}}>
                        <span className="loader"/>
                        <Header as="h1" inverted>Loading</Header>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default LoadingScreen;