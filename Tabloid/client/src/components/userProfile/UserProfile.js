import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';

export default ({ user, setClickedUser, setSelectedUser, toggleModal, toggleEditModal, isAdmin, isActive }) => {
    const [activeUser, setActiveUser] = useState(true)
    const history = useHistory()

    const activeUserCheck = () => {
        if (user.isActive) {
            setActiveUser(true)
        } else {
            setActiveUser(false)
        }
    }

    useEffect(() => {
        activeUserCheck()
    }, [activeUser])

    return (
        <tr key={user.id}>
            <td style={{ cursor: "pointer" }} onClick={() => history.push(`/userProfile/${user.id}`)}>
                {user.fullName}
            </td>
            <td>{user.displayName}</td>
            <td>{user.userType.name}</td>
            {(isAdmin && activeUser) &&
                <>
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
                </>
            }
            {!activeUser &&
                <td>
                    <Button>Reactivate</Button>
                </td>
            }

        </tr>
    )
}