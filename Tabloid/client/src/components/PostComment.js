import React, { useState } from "react";
import { Collapse, Button, CardBody, Card } from "reactstrap";

export const PostComment = ({ comments }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Button color="primary" onClick={toggle} style={{ marginBottom: "1rem" }}>
        Comments
      </Button>
      <Collapse isOpen={isOpen}>
        <Card>
          <CardBody>
            {comments.map((c) => (
              <p key={c.id}>{c.content}</p>
            ))}
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );
};
