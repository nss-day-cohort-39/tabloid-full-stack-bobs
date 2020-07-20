import React, { useState, useContext, createContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";
import { useHistory } from "react-router-dom";

export const CommentContext = createContext();

export const CommentProvider = (props) => {
  const [comments, setComments] = useState([]);
  const { getToken } = useContext(UserProfileContext);
  const history = useHistory();

  const getCommentsByPostId = (id) =>
    getToken().then((token) =>
      fetch(`/api/comment/getbypost/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then(setComments)
    );

  const addComment = (comment, postId) =>
    getToken().then((token) =>
      fetch("/api/comment", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      }).then(() => {
        getCommentsByPostId(postId);
      })
    );

  const deleteComment = (id, postId) =>
    getToken().then((token) =>
      fetch(`/api/comment/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((resp) => {
        if (resp.ok) {
          getCommentsByPostId(postId);
        } else {
          throw new Error("Unauthorized");
        }
      })
    );

  const updateComment = (comment, postId) => {
    return getToken().then((token) =>
      fetch(`/api/comment/${comment.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      }).then((resp) => {
        if (resp.ok) {
          getCommentsByPostId(postId);
        } else {
          throw new Error("Unauthorized");
        }
      })
    );
  };

  return (
    <CommentContext.Provider
      value={{
        comments,
        getCommentsByPostId,
        addComment,
        deleteComment,
        updateComment,
      }}
    >
      {props.children}
    </CommentContext.Provider>
  );
};
