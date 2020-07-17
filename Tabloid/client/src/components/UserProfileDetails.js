import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { UserProfileContext } from '../providers/UserProfileProvider';

export default () => {
    const { id } = useParams()
    const { getUserProfile } = useContext(UserProfileContext)
    const { user, setUser } = useState({ userProfile: {} })

    // useEffect(() => {
    //     getUserProfile
    // })

}