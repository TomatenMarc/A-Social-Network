import React, {Component} from 'react';
import Heading from "./segments/Heading";
import SocialExplorer from "./segments/SocialExplorer";
import Footer from "../../components/Footer";
import MenuBar from "../../components/MenuBar";
import AccountExplorer from "./segments/AccountExplorer";
import StatementInput from "./segments/StatementInput";

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
                <StatementInput/>
                <SocialExplorer/>
                <AccountExplorer/>
                <Footer/>
            </div>
        );
    }
}

export default MainPage;