import React, {Component} from 'react';
import {Comment, Icon, Segment} from "semantic-ui-react";
import {PropTypes} from "prop-types";
import {Link} from "react-router-dom";

function foo() {
    var parts = "I am a cow; cows say moo. MOOOOO.".split(/(\bmoo+\b)/gi);
    for (var i = 1; i < parts.length; i += 2) {
        parts[i] = <Link to={"/"} key={i}>{parts[i]}</Link>;
    }
    return <div>{parts}</div>;
}

const CommentTemplate = ({image, item}) => {


    function filterByValue(list, match) {
        return list.filter(obj =>
            Object.keys(obj).some(x => match.includes(obj[x]))
        )[0]
    }

    function linkHashtagAndMentions() {
        function link(word) {
            if (word.includes("#") && word.includes("@")) {
                word = word.replaceAll("#", " #")
                word = word.replaceAll("@", " @")
                return word.split(" ").map((part, index) => {
                    let cleaned = part.replaceAll(" ", "")
                    if (cleaned.startsWith("@") || cleaned.startsWith("#"))
                        return <Link to="/" key={index}>{cleaned}</Link>
                    return cleaned
                })
            } else if (word.includes("#")) {
                word = word.replaceAll("#", " #")
                return word.split(" ").map((part, index) => {
                    let cleaned = part.replaceAll(" ", "")
                    if (cleaned.startsWith("#"))
                        return <Link to="/" key={index}>{cleaned}</Link>
                    return cleaned
                })
            } else if (word.includes("@")) {
                word = word.replaceAll("@", " @")
                return word.split(" ").map((part, index) => {
                    let cleaned = part.replaceAll(" ", "")
                    if (cleaned.startsWith("@"))
                        return <Link to="/" key={index}>{cleaned}</Link>
                    return cleaned
                })
            }
            return word
        }

        let parts = "hey hey #dasdasd@Marc#dasdasda #dasdas".split(" ").map((word, index) => {
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