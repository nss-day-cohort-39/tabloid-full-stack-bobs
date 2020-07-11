import React, { useState } from 'react';


export const PostContext = React.createContext();

export const PostProvider = (props) => {
    const [posts, setPosts] = useState([]);

    const getAllPosts = () => {
        return fetch("/api/post")
            .then((res) => res.json())
            .then(setPosts);
    };

    const getPostsByUserProfileId = (id) => {
        return fetch(`/api/post/getbyuser/${id}`)
            .then((res) => res.json())
    }

    const getPostById = (id) => {

        return fetch(`/api/post/${id}`)
            .then((res) => res.json())
    }

    const deletePost = (id) =>
        getToken().then((token) =>
            fetch(`/api/post/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((resp) => {
                if (resp.ok) {
                    getAllPosts();
                } else {
                    throw new Error("Unauthorized");
                }
            })
        );

    return (
        <PostContext.Provider value={{
            posts, getAllPosts, setPosts, getPostsByUserProfileId, getPostById, deletePost
        }}>
            {props.children}
        </PostContext.Provider>
    )
}