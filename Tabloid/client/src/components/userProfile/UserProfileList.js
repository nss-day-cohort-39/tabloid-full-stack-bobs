import React, { useContext, useEffect, useState } from 'react';
import { UserProfileContext } from '../../providers/UserProfileProvider';
import UserDeactivationModal from './UserDeactivationModal';
import { Table, Modal, ModalBody, ModalHeader } from "reactstrap";
import { EditUserProfileForm } from "../EditUserProfileForm";
import { UserTypeContext } from '../../providers/UserTypeProvider';
import UserProfile from './UserProfile';


export default () => {
    const { userProfiles, getAllUserProfiles } = useContext(UserProfileContext)
    const { getAllUserTypes } = useContext(UserTypeContext)
    const activeUsers = userProfiles.filter(up => up.isActive === true)
    const [modal, setModal] = useState(false)
    const toggleModal = () => setModal(!modal)
    const [clickedUser, setClickedUser] = useState({ id: 0 })
    const [selectedUser, setSelectedUser] = useState({});
    const [editModal, setEditModal] = useState(false);
    const toggleEditModal = () => setEditModal(!editModal);

    useEffect(() => {
        getAllUserProfiles()
            .then(() => getAllUserTypes())
    }, [])

    return (
        <>
            <h1>User Profiles</h1>
            <Table>
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Display Name</th>
                        <th>User Type</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        activeUsers.map(profile => {
                            return <UserProfile
                                key={profile.id}
                                user={profile}
                                setClickedUser={setClickedUser}
                                toggleModal={toggleModal}
                                setSelectedUser={setSelectedUser}
                                toggleEditModal={toggleEditModal}
                            />
                        })
                    }
                </tbody>
            </Table>
            <Modal isOpen={editModal}>
                <ModalHeader>Edit User Type</ModalHeader>
                <ModalBody>
                    <EditUserProfileForm
                        userProfile={selectedUser}
                        toggle={toggleEditModal}
                    />
                </ModalBody>
            </Modal>
            <UserDeactivationModal modal={modal} toggleModal={toggleModal} clickedUser={clickedUser} />
        </>
    )
}
