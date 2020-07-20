import React, { useContext, useEffect, useState } from 'react';
import { UserProfileContext } from '../providers/UserProfileProvider';
import { Table, ModalBody, Modal, ModalFooter, Button } from 'reactstrap';
import { useHistory, Link } from 'react-router-dom';


export default () => {
    const { userProfiles, getAllUserProfiles } = useContext(UserProfileContext)
    const [modal, setModal] = useState(false)
    const toggleModal = () => setModal(!modal)
    const history = useHistory()



    useEffect(() => {
        getAllUserProfiles()
    }, [])


    return (
        <>
            <h1>User Profiles</h1>
            <Table hover>
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
                                <tr key={profile.id} onClick={() => history.push(`/userProfile/${profile.id}`)}>
                                    <td>{profile.fullName}</td>
                                    <td>{profile.displayName}</td>
                                    <td>{profile.userType.name}</td>
                                    <td>
                                        <Link onClick={toggleModal}>Deactivate</Link>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            <Modal isOpen={modal} toggle={toggleModal} >
                <ModalBody>
                    Are you sure you want to deactivate this account?
                </ModalBody>
                <ModalFooter>
                    <Button>Yes</Button>
                    <Button>Cancel</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}