import React, {Component} from 'react';
import MenuBar from "../../components/MenuBar";
import Heading from "./segments/Heading";

class StatementPage extends Component {
    render() {
        return (
            <div>
                <MenuBar/>
                <Heading/>
            </div>
        );
    }
}

export default StatementPage;