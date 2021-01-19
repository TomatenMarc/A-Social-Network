import React, {Component} from 'react';
import {Button, Form, Image, Modal} from "semantic-ui-react";
import {PropTypes} from "prop-types";
import axios from "axios";
import {withCookies} from "react-cookie";

class EditAccountModal extends Component {

    /**
     * This component is for editing the account.
     * Therefore the biography and the image are editable.
     * @type {{image: *, uid: *, onClose: *, modalOpen: *, biography: *}}
     */
    static propTypes = {
        modalOpen: PropTypes.bool.isRequired,
        onClose: PropTypes.func.isRequired,
        image: PropTypes.string.isRequired, // url appendix to the image
        biography: PropTypes.string.isRequired,
        uid: PropTypes.number
    };

    /**
     * This component needs a file to be uploaded.
     * Furthermore it needs an reference to an input since semantic ui has no own solution.
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            loading: false,
            error: false,
            success: false
        };
        this.fileInputRef = React.createRef(); // to reference the input, since semantic ui provides no own solution
        this.fileChange = this.fileChange.bind(this);
        this.fileUpload = this.fileUpload.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    /**
     * This method handle the image change if the user chooses an image for the device.
     * @param event
     */
    fileChange = (event) => {
        event.preventDefault();
        this.setState({
            success: false,
            file: event.target.files[0]
        }, () => {
            console.log("Choosen", this.state.file);
        });
    };

    /**
     * This method uploads the image to the backend.
     * It also handles an upload progress.
     * @param event of uploading the image.
     */
    fileUpload = (event) => {
        event.preventDefault();
        const url = "http://192.168.0.3:8000/accounts/update/";
        const formData = new FormData();
        formData.append("file", this.state.file);
        const {cookies} = this.props
        const utkn = cookies.get("utkn")
        axios.put(url, formData, {
            headers: {
                'Authorization': 'Token '.concat(utkn),
                "Content-type": "multipart/form-data"
            },
            onUploadProgress: (ev) => {
                const progress = ev.loaded / ev.total * 100;
                console.log(Math.round(progress));
                this.setState({
                    success: false,
                    loading: Math.round(progress) < 100
                })
            }
        })
            .then(response => {
                this.setState({
                    success: true
                })
            }).catch(error => {
            this.setState({
                success: false
            })
        })
    };

    /**
     * This method handles the saving of the new data.
     * @param event
     */
    handleSave = (event) => {
        this.fileUpload(event)
    }

    /**
     * This will show the edit modal for the calling account.
     * @returns {JSX.Element}
     */
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
                        size={"small"}
                        centered
                        label={{corner: 'left', icon: 'edit outline', color: 'blue'}}
                        src={this.state.file ? URL.createObjectURL(this.state.file) : this.props.image}
                        onClick={() => this.fileInputRef.current.click()}
                    />
                    <input
                        ref={this.fileInputRef}
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={this.fileChange}
                    />
                </Modal.Content>
                <Modal.Content>
                    <Form widths='equal'>
                        <Form.TextArea label={"Biography"} placeholder={this.props.biography}/>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        primary
                        content="Save"
                        onClick={this.handleSave}
                        loading={this.state.loading}
                        icon={this.state.success ? "check" : "save"}
                    />
                </Modal.Actions>
            </Modal>
        );
    }
}

export default withCookies(EditAccountModal);