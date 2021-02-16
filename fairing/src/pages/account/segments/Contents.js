import React, {Component} from 'react';
import {Comment, Icon, Segment} from "semantic-ui-react";
import {PropTypes} from "prop-types";
import {Link} from "react-router-dom";

const CommentTemplate = ({image, item}) => {


    function filterByValue(word) {
        if (!(word.startsWith("@") || word.startsWith("#")))
            return null
        let list = word.startsWith("@") ? item["mentioned"] : item["tagged"]
        if (word.startsWith("@"))
            list = list.map((item, index) => {
                return {
                    username: item.user.username,
                    id: item.user.id
                }
            })
        let cleaned_word = word.replaceAll("#", "").replaceAll("@", "")
        console.log(cleaned_word)
        return list.filter(obj =>
            Object.keys(obj).some(x => obj[x] === cleaned_word)
        )
    }

    function linkHashtagAndMentions() {
        function link(word) {
            if (word.includes("#") && word.includes("@")) {
                word = word.replaceAll("#", " #")
                word = word.replaceAll("@", " @")
                return word.split(" ").map((part, index) => {
                    let cleaned = part.replaceAll(" ", "")
                    if (cleaned.startsWith("@") || cleaned.startsWith("#")) {
                        let reference = filterByValue(cleaned)
                        if (reference !== null) {
                            reference = reference[0]
                            if (cleaned.startsWith("@"))
                                return <Link to={"/public/account/".concat(reference.id)} key={index}>{cleaned}</Link>
                            else if (cleaned.startsWith("#"))
                                return <Link to={"/topic/".concat(reference.tag)} key={index}>{cleaned}</Link>
                        }
                        return cleaned
                    }
                    return cleaned
                })
            } else if (word.includes("#")) {
                word = word.replaceAll("#", " #")
                return word.split(" ").map((part, index) => {
                    let cleaned = part.replaceAll(" ", "")
                    if (cleaned.startsWith("#")) {
                        let reference = filterByValue(cleaned)
                        if (reference !== null) {
                            reference = reference[0]
                            return <Link to={"/topic/".concat(reference.tag)} key={index}>{cleaned}</Link>
                        }
                        return cleaned
                    }
                    return cleaned
                })
            } else if (word.includes("@")) {
                word = word.replaceAll("@", " @")
                return word.split(" ").map((part, index) => {
                    let cleaned = part.replaceAll(" ", "")
                    if (cleaned.startsWith("@")) {
                        let reference = filterByValue(cleaned)
                        if (reference !== null) {
                            reference = reference[0]
                            return <Link to={"/public/account/".concat(reference.id)} key={index}>{cleaned}</Link>
                        }
                        return cleaned
                    }
                    return cleaned
                })
            }
            return word
        }

        let parts = item["content"].split(" ").map((word, index) => {
            return link(word)
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