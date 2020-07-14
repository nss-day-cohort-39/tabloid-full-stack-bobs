import React, { useState, useContext, createContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";
import { useHistory } from "react-router-dom";

export const TagContext = createContext();

export const TagProvider = (props) => {
  const [postTags, setPostTags] = useState([]);
  const [tags, setTags] = useState([]);
  const { getToken } = useContext(UserProfileContext);
  const history = useHistory();

  const getAllTags = () =>
    getToken().then((token) =>
      fetch("/api/tag", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then(setTags)
    );

    const getAllPostTags = () =>
    getToken().then((token) =>
      fetch("/api/postTag", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then(setPostTags)
    );

  const getPostTagsByPostId = (id) => {
    return getToken().then((token) =>
      fetch(`/api/posttag/getbypost/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then(setPostTags)
    );
  }

  const addTag = (tag) =>
    getToken().then((token) =>
      fetch("/api/tag", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tag),
      }).then((resp) => {
        if (resp.ok) {
          getAllTags();
        } else {
          throw new Error("Unauthorized");
        }
      })
    );

    const addTagToPost = (postTag) =>
    getToken().then((token) =>
      fetch("/api/postTag", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postTag),
      }).then((resp) => {
        if (resp.ok) {
          getAllTags();
        } else {
          throw new Error("Unauthorized");
        }
      })
    );

  const deleteTag = (id) =>
    getToken().then((token) =>
      fetch(`/api/tag/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((resp) => {
        if (resp.ok) {
          getAllTags();
        } else {
          throw new Error("Unauthorized");
        }
      })
    );

    const deleteTagFromPost = (id) =>
    getToken().then((token) =>
      fetch(`/api/postTag/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((resp) => {
        if (resp.ok) {
          getAllTags();
        } else {
          throw new Error("Unauthorized");
        }
      })
    );

  const updateTag = (tag) => {
    return getToken().then((token) =>
      fetch(`/api/tag/${tag.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tag),
      }).then((resp) => {
        if (resp.ok) {
          getAllTags();
        } else {
          throw new Error("Unauthorized");
        }
      })
    );
  };

  return (
    <TagContext.Provider
      value={{
        tags,
        postTags,
        getAllTags,
        getAllPostTags,
        getPostTagsByPostId,
        addTag,
        addTagToPost,
        deleteTag,
        deleteTagFromPost,
        updateTag,
      }}
    >
      {props.children}
    </TagContext.Provider>
  );
};
