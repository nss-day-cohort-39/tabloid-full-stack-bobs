import React, { useContext, useState, useEffect } from "react";
import { CommentContext } from "../providers/CommentProvider";
import { Button, Form } from "reactstrap";
import { useHistory } from "react-router-dom";

export const EditCommentForm = ({ comment, postId, toggle }) => {
  const { updateComment } = useContext(CommentContext);
  const [updatedComment, setComment] = useState(comment);
  const history = useHistory();

  const handleControlledInputChange = (event) => {
    const newComment = Object.assign({}, updatedComment);
    newComment[event.target.name] = event.target.value;
    setComment(newComment);
  };

  const editComment = () => {
    updateComment(updatedComment)
      .then(toggle)
      .then(history.push(`/posts/${postId}`));
  };

  return (
    <form className="editCommentForm">
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">
            Comment:
            <input
              type="text"
              name="name"
              required
              autoFocus
              className="form-control"
              placeholder="Edit comment"
              defaultValue={comment.name}
              onChange={handleControlledInputChange}
            />
          </label>
        </div>
      </fieldset>
      <Button
        color="primary"
        onClick={(e) => {
          e.preventDefault();
          editComment();
        }}
      >
        Save Updates
      </Button>
      <Button onClick={toggle}>Cancel</Button>
    </form>
  );
};
