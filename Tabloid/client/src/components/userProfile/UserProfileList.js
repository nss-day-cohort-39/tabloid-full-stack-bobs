import React, { useContext, useEffect, useState } from 'react';
import { UserProfileContext } from '../../providers/UserProfileProvider';
import { Table } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import UserDeactivationModal from './UserDeactivationModal';


export default () => {
    const { userProfiles, getAllUserProfiles } = useContext(UserProfileContext)
    const [modal, setModal] = useState(false)
    const toggleModal = () => setModal(!modal)
    const [clickedUser, setClickedUser] = useState({ id: 0 })
    const history = useHistory()


    useEffect(() => {
        getAllUserProfiles()
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
                    </tr>
                </thead>
                <tbody>
                    {
                        userProfiles.map(profile => {
                            return (
                                <tr key={profile.id}>
                                    <td style={{ cursor: "pointer" }} onClick={() => history.push(`/userProfile/${profile.id}`)}>
                                        {profile.fullName}
                                    </td>
                                    <td>{profile.displayName}</td>
                                    <td>{profile.userType.name}</td>
                                    <td style={{ color: "blue", cursor: "pointer" }}
                                        onClick={() => {
                                            setClickedUser(profile)
                                            toggleModal()
                                        }}
                                    >
                                        Deactivate
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            <UserDeactivationModal modal={modal} toggleModal={toggleModal} clickedUser={clickedUser} />
        </>
    )
}