import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
export default class ModalshowProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            description: this.props.description,
            showModal: this.props.showModal
        }

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            showModal: nextProps.showModal,
            description: nextProps.description
        });
    }
    closeModal() {
        this.setState({
            showModal: false
        });
        // this.showModal()
            // console.log(this.props);
    }

    render() {
        return ( <Modal isOpen = { this.state.showModal } >
            <ModalHeader > Modal title </ModalHeader>  
            <ModalBody >


            { this.state.description }


            </ModalBody>  
            <ModalFooter >
            <Button type = "button"
            className = "btn btn-secondary"
            onClick = { this.closeModal.bind(this) }
            data-dismiss = "modal" > Close </Button>  
            </ModalFooter>  
            </Modal>
        );
    }
}