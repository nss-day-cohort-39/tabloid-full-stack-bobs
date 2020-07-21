import React, { useContext, useEffect, useState } from 'react';
import { UserProfileContext } from '../../providers/UserProfileProvider';
import { useHistory } from 'react-router-dom';
import UserDeactivationModal from './UserDeactivationModal';
import { Table, Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { EditUserProfileForm } from "../EditUserProfileForm";
import { UserTypeContext } from '../../providers/UserTypeProvider';
import AdminUserProfile from './AdminUserProfile';
import AuthorUserProfile from './AuthorUserProfile';

export default () => {
    const { userProfiles, getAllUserProfiles } = useContext(UserProfileContext)
    const { getAllUserTypes } = useContext(UserTypeContext)
    const currentUser = JSON.parse(sessionStorage.getItem("userProfile"))
    const activeUsers = userProfiles.filter(up => up.isActive === true)
    const [modal, setModal] = useState(false)
    const toggleModal = () => setModal(!modal)
    const [clickedUser, setClickedUser] = useState({ id: 0 })
    const [selectedUser, setSelectedUser] = useState({});
    const [editModal, setEditModal] = useState(false);
    const toggleEditModal = () => setEditModal(!editModal);
    const history = useHistory()

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
                        (currentUser.userType.name === "Admin")
                            ?
                            (
                                activeUsers.map(profile => {
                                    return <AdminUserProfile
                                        user={profile}
                                        setClickedUser={setClickedUser}
                                        toggleModal={toggleModal}
                                        setSelectedUser={setSelectedUser}
                                        toggleEditModal={toggleEditModal}
                                    />
                                })
                            )
                            :
                            (
                                activeUsers.map(profile => {
                                    return <AuthorUserProfile user={profile} />
                                })
                            )

                        // (activeUsers.map(profile => {

                        //     return (
                        //         <tr key={profile.id}>
                        //             <td style={{ cursor: "pointer" }} onClick={() => history.push(`/userProfile/${profile.id}`)}>
                        //                 {profile.fullName}
                        //             </td>
                        //             <td>{profile.displayName}</td>
                        //             <td>{profile.userType.name}</td>
                        //             <td style={{ color: "blue", cursor: "pointer" }}
                        //                 onClick={() => {
                        //                     setClickedUser(profile)
                        //                     toggleModal()
                        //                 }}
                        //             >
                        //                 Deactivate
                        //             </td>
                        //             <td>
                        //                 <Button
                        //                     onClick={() => {
                        //                         setSelectedUser(profile);
                        //                         toggleEditModal();
                        //                     }}
                        //                 >
                        //                     Edit
                        //                 </Button>
                        //             </td>
                        //         </tr>
                        //     )
                        // }))
                        // :
                        // (
                        //     (activeUsers.map(profile => {

                        //         return (
                        //             <tr key={profile.id}>
                        //                 <td style={{ cursor: "pointer" }} onClick={() => history.push(`/userProfile/${profile.id}`)}>
                        //                     {profile.fullName}
                        //                 </td>
                        //                 <td>{profile.displayName}</td>
                        //                 <td>{profile.userType.name}</td>
                        //             </tr>
                        //         )
                        //     }))
                        // )
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
