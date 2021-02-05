import React, {Component} from 'react';
import {Icon} from "semantic-ui-react";
import {PropTypes} from "prop-types";
import EditAccountModal from "../../../components/EditAccountModal";
import "../../../scss/Clickable.css"

class EditAccountButton extends Component {
    /**
     * This component is used to handle the editing of an account.
     * The user can click on it.
     * Then a modal will open which enables the editing of the corresponding account.
     * Since the image and the biography can be changed they are provided as props.
     * @type {{image: *, biography: *}}
     */
    static propTypes = {
        image: PropTypes.string.isRequired, // url appendix to the image
        biography: PropTypes.string.isRequired,
    };


    /**
     * This component opens an modal to edit the calling account.
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false
        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }


    /**
     * This method is for handling the opening of the modal.
     * @param event of the click.
     */
    handleOpen = (event) => {
        event.preventDefault();
        this.setState({modalOpen: true});
    }

    /**
     * This method is for handling the closing of the modal.
     * It also includes esc, a click beside the modal or the cross-button at the top of the modal.
     * @param event of the click beside the modal or on the leave cross or esc.
     */
    handleClose = (event) => {
        event.preventDefault();
        this.setState({modalOpen: false});
        window.location.reload(false); // todo: remove and find a better solution e.g. trigger function of parent.
    }


    render() {
        return (
            <div className="clickable">
                <Icon size="large" name='edit outline' onClick={this.handleOpen}/>
                <EditAccountModal
                    image={this.props.image}
                    biography={this.props.biography}
                    modalOpen={this.state.modalOpen}
                    onClose={this.handleClose}
                />
            </div>

        );
    }
}

export default EditAccountButton;