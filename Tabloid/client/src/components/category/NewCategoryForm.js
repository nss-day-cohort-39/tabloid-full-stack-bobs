/* 
Author(s): Alex Curnow, Billy Blackman
Component Responsibilty: This component generates the form, and calls
the function that allows a user to add a new category.
*/
import React, { useContext, useRef } from "react";
import { CategoryContext } from "../../providers/CategoryProvider";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useHistory } from "react-router-dom";
import "../../styles/Button.css";

export const NewCategoryForm = (props) => {
  const { addCategory } = useContext(CategoryContext);

  const name = useRef("");

  const history = useHistory();

  const constructNewCategory = () => {
    return addCategory({
      name: name.current.value,
    }).then(() => {
      history.push("/category");
    });
  };

  return (
    <Form className="postForm">
      <FormGroup>
        <Label htmlFor="title">Category Name</Label>
        <Input
          type="text"
          name="title"
          id="categoryName"
          placeholder="Enter category name"
          innerRef={name}
          required
          autoFocus
        />
      </FormGroup>
      <Button
        color="primary"
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          constructNewCategory().then(props.toggle);
        }}
      >
        Submit
      </Button>
      <Button onClick={props.toggle}>Cancel</Button>
    </Form>
  );
};
