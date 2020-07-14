import React, { useState } from "react";
import {
  Collapse,
  Button,
  CardBody,
  Card,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { NewCommentForm } from "./NewCommentForm";

export const PostComment = ({ comments, postId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [toggleNewComment, setNewComment] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const toggleNewCommentForm = () => setNewComment(!toggleNewComment);

  return (
    <div>
      <Button color="primary" onClick={toggle} style={{ marginBottom: "1rem" }}>
        Comments
      </Button>
      <Collapse isOpen={isOpen}>
        <Card>
          <CardBody>
            {comments.map((c) => (
              <div key={c.id}>
                <p>
                  <strong>{c.subject}</strong>
                </p>
                <p>{c.content}</p>
                <p>Author: {c.userProfile.displayName}</p>
                <p>Date Created: {c.createDateTime.toLocaleString()}</p>
              </div>
            ))}
          </CardBody>
        </Card>
        <Button
          color="primary"
          onClick={toggleNewCommentForm}
          style={{ marginBottom: "1rem" }}
        >
          Add a New Comment
        </Button>
        <Modal isOpen={toggleNewComment} toggle={toggleNewCommentForm}>
          <ModalHeader toggle={toggleNewCommentForm}></ModalHeader>
          <ModalBody>
            <NewCommentForm
              toggleModal={toggleNewCommentForm}
              postId={postId}
            />
          </ModalBody>
        </Modal>
      </Collapse>
    </div>
  );
};
