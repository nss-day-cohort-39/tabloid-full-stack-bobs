import React, { useContext, useEffect, useState } from "react";
import { CategoryContext } from "../providers/CategoryProvider";
import { Category } from "./Category";
import "../styles/Category.css";
import { Button, Modal, Form } from "reactstrap";
import { NewCategoryForm } from "./NewCategoryForm";
import "../styles/Button.css"
import "../styles/Modal.css"

export const CategoryList = () => {
  const { categories, getAllCategories } = useContext(CategoryContext);
  const [newCategoryModal, setCategoryModal] = useState(false);

  const toggleNewCategoryModal = () => setCategoryModal(!newCategoryModal);

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      <Button color="primary" onClick={toggleNewCategoryModal}>
        Add Category
      </Button>
      <Modal isOpen={newCategoryModal}>
        <NewCategoryForm toggle={toggleNewCategoryModal} />
      </Modal>
      <div className="categoryContainer">
        <div className="row justify-content-center">
          <div className="cards-column">
            {categories.map((category) => (
              <Category key={category.id} category={category} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
