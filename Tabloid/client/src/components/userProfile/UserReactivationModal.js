/* 
Author(s): Calvin Curry
Component Responsibility: Renders a modal that allows Admin users to 
reactivate a currently deactivated user profile.
*/
import React, { useContext } from 'react';
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap';
import { UserProfileContext } from '../../providers/UserProfileProvider';


export default ({ reactivationModal, toggleReactivationModal, deactivatedUser }) => {
    const { reactivateUser } = useContext(UserProfileContext)
    const reactivateAccount = (profile) => {
        reactivateUser(profile)
    }
    return (
        <Modal isOpen={reactivationModal} toggle={toggleReactivationModal} >
            <ModalBody>
                Are you sure you want to re-activate {deactivatedUser.fullName}?
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={() => {
                    reactivateAccount(deactivatedUser)
                    toggleReactivationModal()
                }}>
                    Yes
                </Button>
                <Button onClick={toggleReactivationModal}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}