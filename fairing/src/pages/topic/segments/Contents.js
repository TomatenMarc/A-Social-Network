import React, {Component} from 'react';
import EmptyContentInformation from "../../../components/EmptyContentInformation";

class Contents extends Component {
    render() {
        if (this.props.results.data.length === 0)
            return <EmptyContentInformation/>
        return (
            <div>
                Hey!
            </div>
        );
    }
}

export default Contents;