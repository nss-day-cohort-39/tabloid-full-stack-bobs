import React, { useState, useContext, createContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

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
      .then(setPosts);
  };

  const getPostsByCategory = (categoryId) => {
    return fetch(`/api/post/getbycategory/${categoryId}`)
      .then((res) => res.json())
      .then(setPosts);
  };

  const getPostsByCategoryByUser = (userId, categoryId) => {
    return fetch(`/api/post/getbycategorybyuser/${userId}/${categoryId}`)
      .then((res) => res.json())
      .then(setPosts);
  };

  const getPostById = (id) => {
    return fetch(`/api/post/${id}`).then((res) => res.json());
  };

  const deletePost = (id) => {
    return fetch(`/api/post/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(getAllPosts);
  };

  const updatePost = (post) => {
    return fetch(`/api/post/${post.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    }).then(getAllPosts);
  };

  const addPost = (post) => {
    console.log(post);
    return fetch("/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    }).then(getAllPosts);
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        getAllPosts,
        setPosts,
        getPostsByUserProfileId,
        getPostById,
        getPostsByCategory,
        getPostsByCategoryByUser,
        deletePost,
        updatePost,
        addPost,
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};
