import React from "react";
import { Button } from "reactstrap";

export const Comment = ({ c }) => (
  <div className="comment">
    <p>
      <strong>{c.subject}</strong>
    </p>
    <p>{c.content}</p>
    <p>Author: {c.userProfile.displayName}</p>
    <p>Date Created: {c.createDateTime.toLocaleString()}</p>
    <Button color="primary" onClick={toggleEdit}>
      Edit
    </Button>
    <Button color="danger" onClick={toggleDelete}>
      Delete
    </Button>
  </div>
);
