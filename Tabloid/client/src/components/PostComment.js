import React, { useState, useContext } from "react";
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
import { CommentContext } from "../providers/CommentProvider";

export const PostComment = ({ comments, postId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [toggleNewComment, setNewComment] = useState(false);
  const { deleteComment } = useContext(CommentContext);

  const toggle = () => setIsOpen(!isOpen);
  const toggleNewCommentForm = () => setNewComment(!toggleNewComment);

  const [deleteModal, setDeleteModal] = useState(false);
  const toggleDelete = () => setDeleteModal(!deleteModal);

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
                <Button color="danger" onClick={toggleDelete}>
                  Delete
                </Button>
                <Modal isOpen={deleteModal}>
                  <div>
                    Are you sure you want to delete this comment?
                    <br />
                    <br />
                    <Button
                      color="danger"
                      onClick={(e) => {
                        e.preventDefault();
                        deleteComment(c.id, postId);
                        toggleDelete();
                      }}
                    >
                      Yes, delete
                    </Button>
                    <Button color="secondary" onClick={toggleDelete}>
                      No, go back
                    </Button>
                  </div>
                </Modal>
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
