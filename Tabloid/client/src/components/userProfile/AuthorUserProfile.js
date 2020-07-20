import React from 'react';
import { useHistory } from 'react-router-dom';

export default ({ user }) => {

    const history = useHistory()

    return (
        <tr key={user.id}>
            <td style={{ cursor: "pointer" }} onClick={() => history.push(`/userProfile/${user.id}`)}>
                {user.fullName}
            </td>
            <td>{user.displayName}</td>
            <td>{user.userType.name}</td>
        </tr>
    )
}