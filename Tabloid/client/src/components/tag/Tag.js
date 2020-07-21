/* 
Author(s): Alex Curnow, Billy Blackman
Component Responsibilty: Generates HTML for a tag and handles deleting a tag.
*/
import React, { useState, useContext } from "react";
import { Card, CardTitle, CardBody, Modal, Button } from "reactstrap";
import { TagContext } from "../../providers/TagProvider";
import { EditTagForm } from "./EditTagForm";

export const Tag = ({ tag }) => {
  const { deleteTag } = useContext(TagContext);

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
          <br />
          <br />
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
