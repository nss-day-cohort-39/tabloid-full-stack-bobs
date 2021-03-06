/* 
Author(s): Alex Curnow, Billy Blackman
Component Responsibility: This component is responsible for generating a list of all
categories as well as toggling the edit category modal, which in turn
calls the Edit Category From component.  
*/

import React, { useContext, useEffect, useState } from "react";
import { CategoryContext } from "../../providers/CategoryProvider";
import { Category } from "./Category";
import "../../styles/Category.css";
import { Button, Modal } from "reactstrap";
import { NewCategoryForm } from "./NewCategoryForm";
import "../../styles/Button.css";
import "../../styles/Modal.css";

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
            {categories.map((category) =>
              category.isDeleted ? null : (
                <Category key={category.id} category={category} />
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};
