/* 
Author(s): Calvin Curry
Component Responsibility: Renders a list of active user profiles. Users with the user
type of Admin can toggle the list and view deactivated profiles as well. 
*/
import React, { useContext, useEffect, useState } from 'react';
import { UserProfileContext } from '../../providers/UserProfileProvider';
import UserDeactivationModal from './UserDeactivationModal';
import { Modal, ModalBody, ModalHeader, Button, ListGroup } from "reactstrap";
import { EditUserProfileForm } from "../EditUserProfileForm";
import UserProfile from './UserProfile';
import UserReactivationModal from './UserReactivationModal';


export default () => {
    const { userProfiles, getActiveUserProfiles, getDeactivatedUserProfiles } = useContext(UserProfileContext)
    const currentUser = JSON.parse(sessionStorage.getItem("userProfile"))
    const [activeProfilesView, setActiveProfilesView] = useState(true)
    const [modal, setModal] = useState(false)
    const toggleModal = () => setModal(!modal)
    const [clickedUser, setClickedUser] = useState({ id: 0 })
    const [deactivatedUser, setDeactivatedUser] = useState({ id: 0 })
    const [selectedUser, setSelectedUser] = useState({});
    const [editModal, setEditModal] = useState(false);
    const [reactivationModal, setReactivationModal] = useState(false)
    const toggleEditModal = () => setEditModal(!editModal);
    const toggleReactivationModal = () => setReactivationModal(!reactivationModal)
    const toggleView = () => setActiveProfilesView(!activeProfilesView)
    const [isAdmin, setIsAdmin] = useState(false)
    const [pageView, setPageView] = useState("User Profiles")
    const [header, setHeader] = useState("")

    const userTypeCheck = () => {
        if (currentUser.userTypeId === 1) {
            setIsAdmin(true)
        } else {
            setIsAdmin(false)
        }
    }

    useEffect(() => {
        userTypeCheck();
        if (activeProfilesView === true) {
            getActiveUserProfiles()
            setHeader("User Profiles")
            setPageView("View Deactivated Users")
        } else {
            getDeactivatedUserProfiles()
                .then(() => setPageView("View Active Users"))
                .then(() => setHeader("Deactivated Users"))
        }
    }, [activeProfilesView])

    return (
        <>
            <h1 className="userProfileHeader">{header}</h1>
            {isAdmin &&
                <Button color="primary" className="userProfileToggleButton" onClick={toggleView}>{pageView}</Button>
            }
            <ListGroup className="userProfileList">
                {
                    userProfiles.map(profile => {
                        return <UserProfile
                            key={profile.id}
                            user={profile}
                            setClickedUser={setClickedUser}
                            setDeactivatedUser={setDeactivatedUser}
                            toggleModal={toggleModal}
                            setSelectedUser={setSelectedUser}
                            toggleEditModal={toggleEditModal}
                            toggleReactivationModal={toggleReactivationModal}
                            isAdmin={isAdmin}
                        />
                    })
                }
            </ListGroup>
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
            <UserReactivationModal
                reactivationModal={reactivationModal}
                toggleReactivationModal={toggleReactivationModal}
                deactivatedUser={deactivatedUser}
            />
        </>
    )
}


