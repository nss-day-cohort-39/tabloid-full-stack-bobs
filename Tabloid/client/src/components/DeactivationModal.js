import React from 'react';
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap';


export default ({ modal, toggleModal, clickedUser }) => {

    const deactivateAccount = (profile) => {

    }
    return (
        <Modal isOpen={modal} toggle={toggleModal} >
            <ModalBody>
                Are you sure you want to deactivate {clickedUser.fullName}?
            </ModalBody>
            <ModalFooter>
                <Button>Yes</Button>
                <Button>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}