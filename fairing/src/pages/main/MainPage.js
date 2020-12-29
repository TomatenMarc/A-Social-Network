import React, {Component} from 'react';
import Heading from "./segments/Heading";
import SocialExplorer from "./segments/SocialExplorer";
import Footer from "./segments/Footer";
import MenuBar from "../../components/MenuBar";

class MainPage extends Component {
    /**
     * This component represents the main page of SolAr.
     * @returns {JSX.Element}
     */
    render() {
        return (
            <div>
                <MenuBar/>
                <Heading/>
                <SocialExplorer/>
                <Footer/>
            </div>
        );
    }
}

export default MainPage;