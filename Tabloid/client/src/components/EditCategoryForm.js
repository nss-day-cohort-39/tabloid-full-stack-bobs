import React, { useContext, useState } from "react";
import { CategoryContext } from "../providers/CategoryProvider";
import { Button } from "reactstrap";
import "../styles/Button.css"

export const EditCategoryForm = (props) => {
  const { updateCategory } = useContext(CategoryContext);

  const [updatedCategory, setCategory] = useState(props.category);

  const handleControlledInputChange = (event) => {
    const newCategory = Object.assign({}, updatedCategory);
    newCategory[event.target.name] = event.target.value;
    setCategory(newCategory);
  };

  const editCategory = () => {
    updateCategory(updatedCategory).then(props.toggle);
  };

  return (
    <form className="newCategoryForm">
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">
            Category name:
            <input
              type="text"
              name="name"
              required
              autoFocus
              className="form-control"
              placeholder="Edit category name"
              defaultValue={props.category.name}
              onChange={handleControlledInputChange}
            />
          </label>
        </div>
      </fieldset>
      <Button
        color="primary"
        onClick={(e) => {
          e.preventDefault();
          editCategory();
        }}
      >
        Save Updates
      </Button>
      <Button onClick={props.toggle}>Cancel</Button>
    </form>
  );
};
