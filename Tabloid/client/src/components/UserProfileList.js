import React, { useContext, useEffect } from 'react';
import { UserProfileContext } from '../providers/UserProfileProvider';
import { Table } from 'reactstrap';


export default () => {
    const { userProfiles, getAllUserProfiles } = useContext(UserProfileContext)



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
                                <tr>
                                    <td>{profile.fullName}</td>
                                    <td>{profile.displayName}</td>
                                    <td>{profile.userType.name}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>

        </>
    )
}