import React, {Component} from 'react';
import {Segment, Sticky} from "semantic-ui-react";
import ReactTextareaAutocomplete from "@webscopeio/react-textarea-autocomplete";
import TextareaAutosize from "react-textarea-autosize";
import emoji from "@jukben/emoji-search";
//import "@webscopeio/react-textarea-autocomplete/style.css";
import "../../../scss/Autocomplete.css"

const Emoji = ({entity: {name, char}}) => <div>{`${name}: ${char}`}</div>;
const User = ({entity: {name}}) => <div>{`${name}`}</div>;
const Loading = () => <div>Wait</div>;
const names = [{name: "Marc"}, {name: "Jan"}, {name: "Aylin"}, {name: "Rüdiger"}]
const hashtags = [{name: "NoSmoking"}, {name: "Football"}, {name: "BurgerKing"}, {name: "NoCoffeeNoWorkee"}]


class StatementInput extends Component {
    constructor() {
        super();
        this.contentEditable = React.createRef();
        this.state = {
            html: "Whats up?"
        };
    }

    handleChange = evt => {
        this.setState({html: evt.target.value});
        console.log(this.state.html)
    };

    filterByValue = (array, string) => {
        return array.filter(o =>
            Object.keys(o).some(k => o[k].toLowerCase().includes(string.toLowerCase())));
    }

    /**
     * This component is a sticky input for statements which can be made by the calling user.
     * The offset of 65 is used because the MenuBar of semantic ui has a magic height of 64.93333...px
     * @returns {JSX.Element}
     */
    render() {
        return (
            <Segment basic style={{padding: 0}}>
                <Sticky offset={this.props.offset} context={this.props.context}>
                    <Segment>
                        <ReactTextareaAutocomplete
                            movePopupAsYouType
                            loadingComponent={Loading}
                            textAreaComponent={
                                TextareaAutosize
                            }
                            style={{resize: "none"}}
                            minChar={1}
                            trigger={{
                                ":": {
                                    dataProvider: token => {
                                        return emoji(token)
                                            .slice(0, 10)
                                            .map(({name, char}) => ({name, char}));
                                    },
                                    component: Emoji,
                                    output: (item, trigger) => item.char
                                },
                                "@": {
                                    dataProvider: token => {
                                        return this.filterByValue(names, token)
                                    },
                                    component: User,
                                    output: (item, trigger) => {
                                        console.log(this.value)
                                        return "@" + item.name
                                    }
                                },
                                "#": {
                                    dataProvider: token => {
                                        return this.filterByValue(hashtags, token)
                                    },
                                    component: User,
                                    output: (item, trigger) => {
                                        return "#" + item.name
                                    }
                                }
                            }}
                        />
                    </Segment>
                </Sticky>
            </Segment>
        );
    }
}

export default StatementInput;