import React, { useContext } from 'react';
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap';
import { UserProfileContext } from '../../providers/UserProfileProvider';


export default ({ modal, toggleModal, clickedUser }) => {
    const { deactivateUser } = useContext(UserProfileContext)
    const deactivateAccount = (profile) => {
        deactivateUser(profile)
    }
    return (
        <Modal isOpen={modal} toggle={toggleModal} >
            <ModalBody>
                Are you sure you want to deactivate {clickedUser.fullName}?
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={() => {
                    deactivateAccount(clickedUser)
                    toggleModal()
                }}>
                    Yes
                </Button>
                <Button onClick={toggleModal}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}