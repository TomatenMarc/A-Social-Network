import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "./routes/Routes";
import { withCookies } from "react-cookie";
import { ErrorBoundary } from "react-error-boundary";
import ErrorScreen from "./components/ErrorScreen";
import AuthenticationProvider from './AuthenticationContext';

class App extends Component {
    /**
     * This component represents the complete app.
     * Therefore the complete life will take place in this component.
     * If the forceRefresh should not be used use componentDidUpdate like mentioned at
     * https://reactrouter.com/web/api/history/history-is-mutable. If the corresponding component did update use
     * window.location.reload(false)
     * @returns {JSX.Element}
     */
    render() {
        return (
            <ErrorBoundary
                FallbackComponent={ErrorScreen}>
                <BrowserRouter forceRefresh={true}>
                    <AuthenticationProvider>
                        <Routes />
                    </AuthenticationProvider>
                </BrowserRouter>
            </ErrorBoundary>
        );
    }
}

export default withCookies(App);
