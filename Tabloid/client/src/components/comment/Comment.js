/* 
Author(s): Alex Curnow
Component Responsibilty: This component generates the HTML for a single comment,
sets the currently selected comment in its parent component, and toggles the edit
and delete modal forms in its parent component.
*/
import React from "react";
import { Button, Card, CardBody } from "reactstrap";
import "./Comment.css";

export const Comment = ({ c, toggleEdit, toggleDelete, setComment }) => {
  const [date, time] = c.createDateTime.split("T");
  return (
    <Card key={c.id} style={{ margin: "20px" }}>
      <div className="userProfile">
        <img className="profileImg" src={c.userProfile.imageLocation} />
        <span>{c.userProfile.displayName}</span>
      </div>
      <CardBody>
        <p>
          <strong>Subject: </strong>
          {c.subject}
        </p>
        <p>
          <strong>Comment: </strong>
          {c.content}
        </p>
        <p>
          <strong>Date Created: </strong>
          {date.toLocaleString()}
        </p>
        <Button
          color="primary"
          onClick={() => {
            setComment(c);
            toggleEdit();
          }}
        >
          Edit
        </Button>
        <Button
          color="danger"
          onClick={() => {
            setComment(c);
            toggleDelete();
          }}
        >
          Delete
        </Button>
      </CardBody>
    </Card>
  );
};
