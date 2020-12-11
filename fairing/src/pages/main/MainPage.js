import React, {Component} from 'react';
import "../../scss/Positioning.css"
import Heading from "./segments/Heading";
import Socializer from "./segments/Socializer";
import Footer from "./segments/Footer";

class MainPage extends Component {
    /**
     * This component represents the main page of SolAr.
     * @returns {JSX.Element}
     */
    render() {
        return (
            <div>
                <Heading/>
                <Socializer/>
                <Footer/>
            </div>
        );
    }
}

export default MainPage;