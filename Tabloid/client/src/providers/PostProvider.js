import React, { useState, useContext, createContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";


export const PostContext = React.createContext();


export const PostProvider = (props) => {
    const [posts, setPosts] = useState([]);
    const { getToken } = useContext(UserProfileContext);

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

    const updatePost = (post) => {
        return getToken().then((token) =>
            fetch(`/api/post/${post.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(post),
            }).then((resp) => {
                if (resp.ok) {
                    getAllPosts();
                } else {
                    throw new Error("Unauthorized");
                }
            })
        );
    };

    return (
        <PostContext.Provider value={{
            posts, getAllPosts, setPosts, getPostsByUserProfileId,
            getPostById, deletePost, updatePost
        }}>
            {props.children}
        </PostContext.Provider>
    )
}