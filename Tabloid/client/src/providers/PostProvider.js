import React, { useState } from 'react';


export const PostContext = React.createContext();

export const PostProvider = (props) => {
    const [posts, setPosts] = useState([]);

    const getAllPosts = () => {
        return fetch("/api/post")
            .then((res) => res.json())
            .then(setPosts);
    };


    return (
        <PostContext.Provider value={{
            posts, getAllPosts, setPosts
        }}>
            {props.children}
        </PostContext.Provider>
    )
}