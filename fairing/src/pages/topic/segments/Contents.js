import React, {Component} from 'react';
import EmptyContentInformation from "../../../components/EmptyContentInformation";
import {Comment, Segment} from "semantic-ui-react";
import {StatementTemplate} from "../../../components/input/StatementTemplate";

class Contents extends Component {
    render() {
        if (this.props.results.data.length === 0)
            return <EmptyContentInformation/>
        return (
            <Segment basic>
                <Comment.Group>
                    {
                        this.props.results.data.map((item, index) => {
                            return <StatementTemplate
                                isParent={false}
                                key={index}
                                name={item.author.user.username}
                                image={process.env.REACT_APP_API_URL.concat(item.author.image)}
                                item={item}/>
                        })
                    }
                </Comment.Group>
            </Segment>
        );
    }
}

export default Contents;