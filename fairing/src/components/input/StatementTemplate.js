import {Link} from "react-router-dom";
import {Comment, Icon} from "semantic-ui-react";
import React, {useState} from "react";
import {useHistory} from "react-router";
import StatementInput from "./StatementInput";
import {PropTypes} from "prop-types";
import TimeAgo from "react-timeago";

// todo: add an option to visit the parent element if this component is used for statement observation
export const StatementTemplate = (props) => {
    /**
     * This component is a template for an statement.
     * The template must have an image of the author and the statement itself.
     * The statement must provide tagged hashtags and mentioned users.
     * Since this is a function component using the react-router the history must be used.
     *
     */
    const history = useHistory();
    let [openReactionInput, setOpenReactionInput] = useState(false)
    let [reaction, setReaction] = useState("")

    /**
     * This method needs an list of objects and a word to be looked up.
     * Then the those objects in the list having an value matching the ord are returned.
     * @param list of objects to be searched in.
     * @param word to be looked for in list.
     * @returns Objects who have one keys value matching the provided word.
     */
    function filterByValue(list, word) {
        return list.filter(obj =>
            Object.keys(obj).some(x => obj[x] === word)
        )
    }

    /**
     * This method returns a nested list of words and links to hashtags or accounts.
     * This list must be flatted to get the original sentence with links.
     * If no link can be provided the word is given. Otherwise an list is provided.
     * Those lists are nested words of mentions and hashtags in combination with other characters or numbers.
     * @param word in which links should be added.
     * @returns list of words and links.
     */
    function linkAll(word) {
        // detect and surround hashtags and mentions with whitespace for word extraction
        // Notice: There are no öäüß enabled
        word = word.replaceAll(/#(\w+)/g, " #$1 ")
        word = word.replaceAll(/@(\w+)/g, " @$1 ")
        // each word and possible hashtags or mentions are separated by whitespace
        return word.split(" ").filter(function (element) {
            // remove all empty words
            return element !== ""
        }).map((element, index) => {
            // link hashtags
            if (element.startsWith("#")) {
                let cleaned_element = element.replace("#", "")
                let reference = filterByValue(props.item["tagged"], cleaned_element)
                if (reference.length !== 0) {
                    return <Link key={index} to={"/topic/".concat(reference[0].tag)}>{element}</Link>
                }
            }
            // links mentions
            if (element.startsWith("@")) {
                let cleaned_element = element.replace("@", "")
                // the mentions have another structure and must therefore be remapped for filtering.
                let reference = filterByValue(props.item["mentioned"].map((item, index) => {
                    return {
                        username: item.user.username,
                        id: item.user.id
                    }
                }), cleaned_element)
                if (reference.length !== 0) {
                    return <Link key={index} to={"/public/account/".concat(reference[0].id)}>{element}</Link>
                }
            }
            return element
        })
    }

    /**
     * This method extracts the mentions and hashtags and links them accordingly.
     * Afterword the content is reconstructed.
     * @returns {*|FlatArray<*, 1>[]|any[]}
     */
    function linkHashtagAndMentions() {
        let parts = props.item.content.split(" ").map((word, index) => {
            return linkAll(word)
        })
        return (parts.map((part, index) => {
            // reconstruct the sentences, connected words are still kept as lists to keep the semantic
            return [part, " "]
        }).flat()) // the flat remaps the remaining lists to the original content structure
    }

    /**
     * This function clears the reaction and closes the statement input for reacting.
     */
    function handleClose() {
        setReaction("")
        setOpenReactionInput(false)
    }

    /**
     * This returns the statement in the form of an comment.
     */
    return <Comment style={{
        border: "#6eb1db solid 1px",
        borderRadius: 10,
        padding: 10
    }}>
        <Comment.Avatar as={Link} to={"/public/account/".concat(props.item.author.user.id)} src={props.image}/>
        <Comment.Content>
            <Comment.Author as={Link}
                            to={"/public/account/".concat(props.item.author.user.id)}>{props.name}</Comment.Author>
            <Comment.Metadata>
                {
                    props.reaction === 1 ? <Icon name='thumbs up' color={"green"}/> : props.reaction === 2 ?
                        <Icon name='thumbs down' color={"red"}/> : null
                }
                <TimeAgo date={props.item["created"]}/>
            </Comment.Metadata>
            {
                /**
                 * This is for showing if an statement is an reaction to another statement.
                 * Notice, that this is not used if the statement is used in the header for statement observation.
                 * This is because of the isParent flag.
                 * Therefore, if there is parent of this statement and if this statement is not used in observation mode
                 * then the parent will be shown as well.
                 * Todo: Is isParent a good name ?
                 */
                props.item["relation_to_parent"] && !props.isParent ? <div>
                    <div style={{
                        fontStyle: "italic"
                    }}>
                        {"voted with "}
                        {
                            props.item["relation_to_parent"][0]["vote"] === 1 ?
                                <Icon name='thumbs up'
                                      color={"green"}/> : props.item["relation_to_parent"][0]["vote"] === 2
                                ? <Icon name='thumbs down' color={"red"}/> : null
                        }
                        {"for "}
                    </div>
                    <StatementTemplate
                        item={props.item["relation_to_parent"][0].parent}
                        name={props.item["relation_to_parent"][0].parent.author.user.username}
                        image={process.env.REACT_APP_API_URL.concat(props.item["relation_to_parent"][0].parent.author.image)}
                        isParent={false}
                    />
                    <div style={{
                        fontStyle: "italic"
                    }}>
                        {" because: "}
                    </div>
                </div> : null
            }
            <Comment.Text>
                {
                    linkHashtagAndMentions()
                }
            </Comment.Text>
            <Comment.Actions>
                {
                    !props.isParent ? <Comment.Action onClick={() => {
                            history.push({
                                pathname: "/statement/".concat(props.item.id)
                            })
                        }}>Visit</Comment.Action> :
                        <div>
                            <Comment.Action
                                active={reaction === "support"}
                                onClick={() => {
                                    setReaction("support")
                                    setOpenReactionInput(true)
                                }}>
                                <Icon name='thumbs up'/>
                                Support
                            </Comment.Action>
                            <Comment.Action
                                active={reaction === "attack"}
                                onClick={() => {
                                    setReaction("attack")
                                    setOpenReactionInput(true)
                                }}>
                                <Icon name='thumbs down'/>
                                Attack
                            </Comment.Action>
                            {
                                /**
                                 * This is used to go to the parent of the statement. If this statement is an reaction.
                                 */
                                props.item["relation_to_parent"] ?
                                    <Comment.Action onClick={() => {
                                        history.push({
                                            pathname: "/statement/".concat(props.item["relation_to_parent"][0].parent.id)
                                        })
                                    }}>
                                        <Icon name='hand point up'/>
                                        Show Context
                                    </Comment.Action> : null
                            }

                        </div>

                }
            </Comment.Actions>
        </Comment.Content>

        {
            // If the StatementTemplate is used for reacting then there must be the option to close the input.
            openReactionInput ? <StatementInput
                updateReactions={props.updateReactions}
                handleClose={handleClose}
                reaction={{
                    relation: reaction,
                    to: props.item.id
                }}
                offset={0}
                context={{}}
                sticky={false}
            /> : null
        }
    </Comment>
}

StatementTemplate.propTypes = {
    item: PropTypes.object.isRequired,
    // todo: nest name and image to an object (account)
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    isParent: PropTypes.bool.isRequired,
    updateReactions: PropTypes.func, // not necessary if this component is used for simply showing the statement.
    reaction: PropTypes.number
}