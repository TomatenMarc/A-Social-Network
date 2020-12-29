import React, {Component} from "react";
import MainPage from "./pages/main/MainPage";
import MenuBar from "./components/MenuBar";

class App extends Component {
    /**
     * This component represents the complete app.
     * Therefore the complete life will take place in this component.
     * @returns {JSX.Element}
     */
    render() {
        return (
            <div>
                <MenuBar/>
                <MainPage/>
            </div>
        );
    }
}

export default App;
