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
import { CategoryContext } from "../providers/CategoryProvider";
import { EditCategoryForm } from "./EditCategoryForm";

export const Category = ({ category }) => {
  const { deleteCategory, updateCategory } = useContext(CategoryContext);

  const [editModal, setEditModal] = useState(false);
  const toggleEdit = () => setEditModal(!editModal);

  const [deleteModal, setDeleteModal] = useState(false);
  const toggleDelete = () => setDeleteModal(!deleteModal);

  return (
    <>
      <Card className="categoryCard">
        <CardBody>
          <CardTitle>{category.name}</CardTitle>
          <Button className="secondary" onClick={toggleEdit}>
            Edit
          </Button>
          <Button className="danger" onClick={toggleDelete}>
            Delete
          </Button>
        </CardBody>
      </Card>
      <Modal isOpen={editModal}>
        <Form>
          <EditCategoryForm toggle={toggleEdit} category={category} />
        </Form>
      </Modal>
      <Modal isOpen={deleteModal}>
        <div>
          Are you sure you want to delete this category?
          <Button
            className="danger"
            onClick={() => deleteCategory(category.Id)}
          >
            Yes, delete
          </Button>
          <Button className="secondary" onClick={toggleDelete}>
            No, go back
          </Button>
        </div>
      </Modal>
    </>
  );
};
