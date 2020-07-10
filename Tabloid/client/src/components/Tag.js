import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  CardTitle,
  CardSubtitle,
  CardBody,
  CardImg,
  Modal,
  Button,
  ModalHeader,
  Form,
} from "reactstrap";
import { TagContext } from "../providers/TagProvider";
import { EditTagForm } from "./EditTagForm";

export const Tag = ({ tag }) => {
  const { deleteTag, updateTag } = useContext(TagContext);

  const [editModal, setEditModal] = useState(false);
  const toggleEdit = () => setEditModal(!editModal);

  const [deleteModal, setDeleteModal] = useState(false);
  const toggleDelete = () => setDeleteModal(!deleteModal);

  return (
    <>
      <Card className="TagCard">
        <CardBody>
          <CardTitle>{tag.name}</CardTitle>
          <Button color="secondary" onClick={toggleEdit}>
            Edit
          </Button>
          <Button color="danger" onClick={toggleDelete}>
            Delete
          </Button>
        </CardBody>
      </Card>
      <Modal isOpen={editModal}>
        <EditTagForm toggle={toggleEdit} tag={tag} />
      </Modal>
      <Modal isOpen={deleteModal}>
        <div>
          Are you sure you want to delete this Tag?
          <Button
            color="danger"
            onClick={(e) => {
              e.preventDefault();
              deleteTag(tag.id);
            }}
          >
            Yes, delete
          </Button>
          <Button color="secondary" onClick={toggleDelete}>
            No, go back
          </Button>
        </div>
      </Modal>
    </>
  );
};
