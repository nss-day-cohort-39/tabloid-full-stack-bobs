import React, { useContext, useEffect, useState } from 'react';
import { UserProfileContext } from '../../providers/UserProfileProvider';
import UserDeactivationModal from './UserDeactivationModal';
import { Table, Modal, ModalBody, ModalHeader, Button } from "reactstrap";
import { EditUserProfileForm } from "../EditUserProfileForm";
import { UserTypeContext } from '../../providers/UserTypeProvider';
import UserProfile from './UserProfile';


export default () => {
    const { userProfiles, getActiveUserProfiles, getDeactivatedUserProfiles } = useContext(UserProfileContext)
    const currentUser = JSON.parse(sessionStorage.getItem("userProfile"))
    const { getAllUserTypes } = useContext(UserTypeContext)
    const [activeProfilesView, setActiveProfilesView] = useState(true)
    const [modal, setModal] = useState(false)
    const toggleModal = () => setModal(!modal)
    const [clickedUser, setClickedUser] = useState({ id: 0 })
    const [selectedUser, setSelectedUser] = useState({});
    const [editModal, setEditModal] = useState(false);
    const toggleEditModal = () => setEditModal(!editModal);
    const toggleView = () => setActiveProfilesView(!activeProfilesView)
    const [isAdmin, setIsAdmin] = useState(false)

    const userTypeCheck = () => {
        if (currentUser.userType.name === "Admin") {
            setIsAdmin(true)
        } else {
            setIsAdmin(false)
        }
    }

    useEffect(() => {
        getAllUserTypes().then(userTypeCheck);
        if (activeProfilesView === true) {
            getActiveUserProfiles()
        } else {
            getDeactivatedUserProfiles()
        }
    }, [activeProfilesView])

    return (
        <>
            <h1>User Profiles</h1>
            {isAdmin &&
                <Button onClick={toggleView} >View Deactivated</Button>
            }
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
                        userProfiles.map(profile => {
                            return <UserProfile
                                key={profile.id}
                                user={profile}
                                setClickedUser={setClickedUser}
                                toggleModal={toggleModal}
                                setSelectedUser={setSelectedUser}
                                toggleEditModal={toggleEditModal}
                                isAdmin={isAdmin}
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
