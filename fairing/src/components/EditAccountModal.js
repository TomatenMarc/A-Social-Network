import React, {Component} from 'react';
import {Button, Form, Image, Modal} from "semantic-ui-react";
import {PropTypes} from "prop-types";

class EditAccountModal extends Component {

    /**
     * This component is for editing the account.
     * Therefore the biography and the image are editable.
     * @type {{image: *, uid: *, onClose: *, modalOpen: *, biography: *}}
     */
    static propTypes = {
        modalOpen: PropTypes.func.isRequired,
        onClose: PropTypes.func.isRequired,
        image: PropTypes.string.isRequired, // url appendix to the image
        biography: PropTypes.string.isRequired,
        uid: PropTypes.number
    };

    render() {
        return (
            <Modal
                open={this.props.modalOpen}
                onClose={this.props.onClose}
                closeIcon
            >
                <Modal.Header>Edit your account!</Modal.Header>
                <Modal.Content image>

                    <Image
                        centered
                        bordered
                        size='small'
                        label={{corner: 'left', icon: 'save', color: 'blue'}}
                        src={this.props.image}
                        fluid
                    />
                </Modal.Content>
                <Modal.Content>
                    <Form widths='equal'>
                        <Form.TextArea fluid label={"Biography"} placeholder={this.props.biography}/>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        content="Save"
                        labelPosition='right'
                        icon='checkmark'
                        positive
                    />
                </Modal.Actions>
            </Modal>
        );
    }
}

export default EditAccountModal;