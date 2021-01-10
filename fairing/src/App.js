import React, {Component} from "react";
import {BrowserRouter} from "react-router-dom";
import {Routes} from "./routes/Routes";
import {withCookies} from "react-cookie";
import {ErrorBoundary} from "react-error-boundary";
import ErrorScreen from "./components/ErrorScreen";

class App extends Component {
    /**
     * This component represents the complete app.
     * Therefore the complete life will take place in this component.
     * @returns {JSX.Element}
     */
    render() {
        return (
            <ErrorBoundary
                FallbackComponent={ErrorScreen}>
                <BrowserRouter>
                    <Routes/>
                </BrowserRouter>
            </ErrorBoundary>
        );
    }
}

export default withCookies(App);
