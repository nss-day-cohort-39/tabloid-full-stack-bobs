import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { UserProfileContext } from '../providers/UserProfileProvider';
import { CardImg, Card, CardBody, CardTitle, CardText } from 'reactstrap';

export default () => {
    const { id } = useParams()
    const { getUserProfileByUserId } = useContext(UserProfileContext)
    const [user, setUser] = useState({ id: 0 })

    useEffect(() => {

        getUserProfileByUserId(parseInt(id))
            .then(setUser)
    }, [])

    return (
        <>
            <Card>
                {
                    (user.imageLocation)
                        ? <CardImg top src={user.imageLocation} alt={user.displayName} />
                        : <CardImg top src="https://s3.amazonaws.com/37assets/svn/765-default-avatar.png" />
                }

                {
                    (user.id === 0)
                        ? null
                        : (
                            <CardBody>
                                <CardTitle>Display Name : {user.displayName}</CardTitle>
                                <CardText>Email: {user.email}</CardText>
                                <CardText>User Type: {user.userType.name}</CardText>
                                <CardText>Date Joined: {user.createDateTime}</CardText>
                            </CardBody>
                        )
                }
            </Card>
        </>

    )

    //     Full name
    // Avatar image (if exists, else use a default image)
    // Display name
    // Email
    // Creation Date (MM/DD/YYYY)
    // User Profile type
}