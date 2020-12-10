import React, {Component} from "react";
import MainPage from "./pages/main/MainPage";

class App extends Component {
    /**
     * This component represents the complete app.
     * Therefore the complete life will take place in this component.
     * @returns {JSX.Element}
     */
    render() {
        return (
            <div>
                <MainPage/>
            </div>
        );
    }
}

export default App;
