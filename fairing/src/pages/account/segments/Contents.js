import React, {Component} from 'react';
import {Comment, Icon, Segment} from "semantic-ui-react";
import {PropTypes} from "prop-types";
import {Link} from "react-router-dom";

const CommentTemplate = ({image, item}) => {


    function filterByValue(list, word) {
        return list.filter(obj =>
            Object.keys(obj).some(x => obj[x] === word)
        )
    }

    function linkHashtagAndMentions() {
        function linkAll(word) {
            word = word.replaceAll(/#(\w+)/g, " #$1 ")
            word = word.replaceAll(/@(\w+)/g, " @$1 ")
            return word.split(" ").filter(function (element) {
                return element !== ""
            }).map((element, index) => {
                if (element.startsWith("#")) {
                    let cleaned_element = element.replace("#", "")
                    let reference = filterByValue(item["tagged"], cleaned_element)
                    if (reference) {
                        return <Link key={index} to={"/topic/".concat(reference[0].tag)}>{element}</Link>
                    }
                }
                if (element.startsWith("@")) {
                    let cleaned_element = element.replace("@", "")
                    let reference = filterByValue(item["mentioned"].map((item, index) => {
                        return {
                            username: item.user.username,
                            id: item.user.id
                        }
                    }), cleaned_element)
                    if (reference) {
                        return <Link key={index} to={"/public/account/".concat(reference[0].id)}>{element}</Link>
                    }
                }
                return element
            })
        }

        let parts = item["content"].split(" ").map((word, index) => {
            return linkAll(word)
        })
        return (parts.map((part, index) => {
            return [part, " "]
        }).flat())
    }


    return <Comment>
        <Comment.Avatar as='a' src={image}/>
        <Comment.Content>
            <Comment.Author>Tom Lukic</Comment.Author>
            <Comment.Text>
                {
                    linkHashtagAndMentions()
                }
            </Comment.Text>
            <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
                <Comment.Action>Save</Comment.Action>
                <Comment.Action>Hide</Comment.Action>
                <Comment.Action>
                    <Icon name='expand'/>
                    Full-screen
                </Comment.Action>
            </Comment.Actions>
        </Comment.Content>
    </Comment>
}

class Contents extends Component {
    /**
     * This component is for the representation of the contents created by the user.
     * Todo: Use a responsive design to show the content.
     * Todo: The content itself must be an own component, they must handle mentions and hashtags.
     * @type {{statements: *}}
     */
    static propTypes = {
        account: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        console.log(props.account)
    }

    /**
     * This will show the content provided by the corresponding account.
     * @returns {JSX.Element}
     */
    render() {
        if (this.props.account.statements.length === 0)
            return null
        return (
            <Segment basic>
                <Comment.Group>
                    {
                        this.props.account["statements"].map((item, index) => {
                            return <CommentTemplate
                                key={index}
                                image={process.env.REACT_APP_API_URL.concat(this.props.account.image)}
                                item={item}/>
                        })
                    }
                </Comment.Group>
            </Segment>
        );
    }
}

export default Contents;