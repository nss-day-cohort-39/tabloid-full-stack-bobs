import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { UserProfileContext } from '../providers/UserProfileProvider';
import { CardImg, Card } from 'reactstrap';

export default () => {
    const { id } = useParams()
    const { getUserProfileByUserId } = useContext(UserProfileContext)
    const [user, setUser] = useState({ id: 0 })

    useEffect(() => {
        getUserProfileByUserId(id)
            .then(r => setUser(r))
            .then(r => console.log(user));
    }, [])

    return (
        <>
            <Card>
                {/* {
                    (user.imageLocation)
                        ? <CardImg top src={user.imageLocation} alt={user.displayName} />
                        : <CardImg top src="https://s3.amazonaws.com/37assets/svn/765-default-avatar.png" />
                } */}

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