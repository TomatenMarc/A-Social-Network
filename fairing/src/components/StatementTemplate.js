import {Link} from "react-router-dom";
import {Comment, Icon} from "semantic-ui-react";
import React from "react";
import {useHistory} from "react-router";

export function StatementTemplate({isParent, name, image, item}) {
    /**
     * This component is a template for an statement.
     * The template must have an image of the author and the statement itself.
     * The statement must provide tagged hashtags and mentioned users.
     * Since this is a function component using the react-router the history must be used.
     */
    const history = useHistory();

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
                let reference = filterByValue(item["tagged"], cleaned_element)
                if (reference.length !== 0) {
                    return <Link key={index} to={"/topic/".concat(reference[0].tag)}>{element}</Link>
                }
            }
            // links mentions
            if (element.startsWith("@")) {
                let cleaned_element = element.replace("@", "")
                // the mentions have another structure and must therefore be remapped for filtering.
                let reference = filterByValue(item["mentioned"].map((item, index) => {
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
        let parts = item["content"].split(" ").map((word, index) => {
            return linkAll(word)
        })
        return (parts.map((part, index) => {
            // reconstruct the sentences, connected words are still kept as lists to keep the semantic
            return [part, " "]
        }).flat()) // the flat remaps the remaining lists to the original content structure
    }

    /**
     * This returns the statement in the form of an comment.
     */
    return <Comment>
        <Comment.Avatar as={Link} to={"/public/account/".concat(item.author.user.id)} src={image}/>
        <Comment.Content>
            <Comment.Author as={Link} to={"/public/account/".concat(item.author.user.id)}>{name}</Comment.Author>
            <Comment.Text>
                {
                    linkHashtagAndMentions()
                }
            </Comment.Text>
            <Comment.Actions>
                {
                    !isParent ? <Comment.Action onClick={() => {
                            history.push({
                                pathname: "/statement/".concat(item["id"])
                            })
                        }}>Visit</Comment.Action> :
                        <div>
                            <Comment.Action>
                                <Icon name='thumbs up'/>
                                Support
                            </Comment.Action>
                            <Comment.Action>
                                <Icon name='thumbs down'/>
                                Support
                            </Comment.Action>
                        </div>

                }
            </Comment.Actions>
        </Comment.Content>
    </Comment>
}
