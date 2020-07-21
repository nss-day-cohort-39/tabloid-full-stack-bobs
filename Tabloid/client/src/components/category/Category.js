/* 
Author(s): Alex Curnow, Billy Blackman
Component Responsibility: This component is responsible for generating the HTML for a
category, toggling the edit and delete category modals, and actually
deleting a category.
*/

import React, { useState, useContext } from "react";
import { Card, CardTitle, CardBody, Modal, Button } from "reactstrap";
import { CategoryContext } from "../../providers/CategoryProvider";
import { EditCategoryForm } from "./EditCategoryForm";
import "../../styles/Button.css";

export const Category = ({ category }) => {
  const { deleteCategory } = useContext(CategoryContext);

  const [editModal, setEditModal] = useState(false);
  const toggleEdit = () => setEditModal(!editModal);

  const [deleteModal, setDeleteModal] = useState(false);
  const toggleDelete = () => setDeleteModal(!deleteModal);

  return (
    <>
      <Card className="categoryCard">
        <CardBody>
          <CardTitle>{category.name}</CardTitle>
          <Button color="secondary" onClick={toggleEdit}>
            Edit
          </Button>
          <Button color="danger" onClick={toggleDelete}>
            Delete
          </Button>
        </CardBody>
      </Card>
      <Modal isOpen={editModal}>
        <EditCategoryForm toggle={toggleEdit} category={category} />
      </Modal>
      <Modal isOpen={deleteModal}>
        <div>
          Are you sure you want to delete this category?
          <br />
          <br />
          <Button
            color="danger"
            onClick={(e) => {
              e.preventDefault();
              deleteCategory(category.id);
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
