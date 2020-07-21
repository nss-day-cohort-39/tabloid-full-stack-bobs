/* 
Author(s): Alex Curnow
Component Responsibilty: Generates HTML for the new comment form
and calls the method that allows users to add new comments to a post.
*/
import React, { useContext, useRef } from "react";
import { CommentContext } from "../../providers/CommentProvider";
import { Button, Form } from "reactstrap";

export const NewCommentForm = ({ postId, toggleModal }) => {
  const { addComment } = useContext(CommentContext);
  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));

  const subject = useRef();
  const content = useRef();

  const createComment = () => {
    addComment(
      {
        postId: parseInt(postId),
        userProfileId: userProfile.id,
        subject: subject.current.value,
        content: content.current.value,
      },
      postId
    );
  };

  return (
    <Form className="commentForm">
      <h3>Add a New Comment</h3>
      <fieldset>
        <div className="form-group">
          <label htmlFor="subject" className="form-label">
            Subject:
          </label>
          <input
            type="textarea"
            name="subject"
            required
            className="form-control"
            placeholder="add a subject..."
            ref={subject}
            id="commentSubject"
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="content" className="form-label">
            Content:
          </label>
          <input
            type="text"
            name="content"
            required
            className="form-control"
            placeholder="type comment here..."
            ref={content}
            id="commentContent"
          />
        </div>
      </fieldset>
      <Button
        type="submit"
        className="btn btn-primary"
        onClick={(evt) => {
          evt.preventDefault();
          createComment();
          toggleModal();
        }}
      >
        Save New Comment
      </Button>
      <Button onClick={() => toggleModal()}>Cancel</Button>
    </Form>
  );
};
