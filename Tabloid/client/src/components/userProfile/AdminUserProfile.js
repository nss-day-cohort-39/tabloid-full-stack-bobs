import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';

export default ({ user, setClickedUser, setSelectedUser, toggleModal, toggleEditModal }) => {

    const history = useHistory()

    return (
        <tr key={user.id}>
            <td style={{ cursor: "pointer" }} onClick={() => history.push(`/userProfile/${user.id}`)}>
                {user.fullName}
            </td>
            <td>{user.displayName}</td>
            <td>{user.userType.name}</td>
            <td style={{ color: "blue", cursor: "pointer" }}
                onClick={() => {
                    setClickedUser(user)
                    toggleModal()
                }}
            >
                Deactivate
            </td>
            <td>
                <Button
                    onClick={() => {
                        setSelectedUser(user);
                        toggleEditModal();
                    }}
                >
                    Edit
                </Button>
            </td>
        </tr>
    )
}