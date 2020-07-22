/* 
Author(s): Calvin Curry
Component Responsibility: Provides structure of a user profile that
renders on the UserProfileList component.
*/
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, ListGroupItem } from 'reactstrap';
import "./UserProfile.css"

export default ({ user, setClickedUser, setSelectedUser, toggleModal, toggleEditModal, isAdmin, setDeactivatedUser, toggleReactivationModal }) => {
    const [activeUser, setActiveUser] = useState(true)
    const history = useHistory()
    const [userImage, setUserImage] = useState()

    const activeUserCheck = () => {
        if (user.isActive) {
            setActiveUser(true)
        } else {
            setActiveUser(false)
        }
    }

    const showProfileImage = () => {
        return (
            <img
                className="userProfileImage"
                src={user.imageLocation}
                alt={user.displayName}
                onClick={() => history.push(`/userProfile/${user.id}`)}
            />
        )
    }

    const showDefaultImage = () => {
        return (
            <img
                className="userProfileImage"
                src="https://st3.depositphotos.com/4111759/13425/v/450/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg"
                alt={user.displayName}
                onClick={() => history.push(`/userProfile/${user.id}`)}
            />
        )
    }

    useEffect(() => {
        activeUserCheck()
        if (user.imageLocation) {
            setUserImage(showProfileImage)
        } else {
            setUserImage(showDefaultImage)
        }
    }, [activeUser])

    return (
        <ListGroupItem className="userProfileCard" key={user.id}>
            <div>
                {userImage}
            </div>
            <div className="userProfileInfo">
                <p className="userProfileFullName" onClick={() => history.push(`/userProfile/${user.id}`)}>
                    <strong>Name:</strong> {user.fullName}
                </p>
                <p><strong>Display Name:</strong> {user.displayName}</p>
                <p><strong>User Type:</strong> {user.userType.name}</p>
            </div>
            <div className="adminButtons">
                {(isAdmin && activeUser) &&
                    <>
                        <Button
                            color="danger"
                            className="adminButton deactivate"
                            onClick={() => {
                                setClickedUser(user)
                                toggleModal()
                            }}
                        >
                            Deactivate
                        </Button>
                        <Button
                            className="adminButton edit"
                            onClick={() => {
                                setSelectedUser(user);
                                toggleEditModal();
                            }}
                        >
                            Edit
                        </Button>

                    </>
                }
                {!activeUser &&
                    <Button
                        color="success"
                        className="adminButton reactivate"
                        onClick={() => {
                            setDeactivatedUser(user)
                            toggleReactivationModal()
                        }}
                    >
                        Reactivate
                    </Button>
                }
            </div>
        </ListGroupItem>
    )
}