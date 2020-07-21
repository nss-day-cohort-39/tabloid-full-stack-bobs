/* 
Author(s): Alex Curnow, Billy Blackman
Component Responsibilty: Generates the new tag form, allowing users
to add new tags to the system.
*/
import React, { useContext, useRef } from "react";
import { TagContext } from "../../providers/TagProvider";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useHistory } from "react-router-dom";

export const NewTagForm = (props) => {
  const { addTag } = useContext(TagContext);

  const name = useRef("");

  const history = useHistory();

  const constructNewTag = () => {
    return addTag({
      name: name.current.value,
    }).then(() => {
      history.push("/tag");
    });
  };

  return (
    <Form className="postForm">
      <FormGroup>
        <Label htmlFor="title">Tag Name</Label>
        <Input
          type="text"
          name="title"
          id="TagName"
          placeholder="Enter Tag name"
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
          constructNewTag().then(props.toggle);
        }}
      >
        Submit
      </Button>
      <Button onClick={props.toggle}>Cancel</Button>
    </Form>
  );
};
