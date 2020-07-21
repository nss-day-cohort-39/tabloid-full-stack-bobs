/* 
Author(s): Alex Curnow, Billy Blackman
Component Responsibilty: Generates the edit tag form and calls the 
appropriate function to update ("PUT") a tag.
*/
import React, { useContext, useState } from "react";
import { TagContext } from "../../providers/TagProvider";
import { Button } from "reactstrap";
import "../../styles/Button.css";

export const EditTagForm = (props) => {
  const { updateTag } = useContext(TagContext);

  const [updatedTag, setTag] = useState(props.tag);

  const handleControlledInputChange = (event) => {
    const newTag = Object.assign({}, updatedTag);
    newTag[event.target.name] = event.target.value;
    setTag(newTag);
  };

  const editTag = () => {
    updateTag(updatedTag).then(props.toggle);
  };

  return (
    <form className="newTagForm">
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">
            Tag name:
            <input
              type="text"
              name="name"
              required
              autoFocus
              className="form-control"
              placeholder="Edit Tag name"
              defaultValue={props.tag.name}
              onChange={handleControlledInputChange}
            />
          </label>
        </div>
      </fieldset>
      <Button
        color="primary"
        onClick={(e) => {
          e.preventDefault();
          editTag();
        }}
      >
        Save Updates
      </Button>
      <Button onClick={props.toggle}>Cancel</Button>
    </form>
  );
};
