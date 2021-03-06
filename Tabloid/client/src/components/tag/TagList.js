/* 
Author(s): Alex Curnow, Billy Blackman
Component Responsibilty: Generates a list of all tags in the system.
*/
import React, { useContext, useEffect, useState } from "react";
import { TagContext } from "../../providers/TagProvider";
import { Tag } from "./Tag";
import "../../styles/Tag.css";
import { Button, Modal, Form } from "reactstrap";
import { NewTagForm } from "./NewTagForm";

export const TagList = () => {
  const { tags, getAllTags } = useContext(TagContext);
  const [newTagModal, setTagModal] = useState(false);

  const toggleNewTagModal = () => setTagModal(!newTagModal);

  useEffect(() => {
    getAllTags();
  }, []);

  return (
    <>
      <Button color="primary" onClick={toggleNewTagModal}>
        Add Tag
      </Button>
      <Modal isOpen={newTagModal}>
        <NewTagForm toggle={toggleNewTagModal} />
      </Modal>
      <div className="tagContainer">
        <div className="row justify-content-center">
          <div className="cards-column">
            {tags.map((tag) => (
              <Tag key={tag.id} tag={tag} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
