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
              <div key={c.id}>
                <p>
                  <strong>Subject:</strong> {c.subject}
                </p>
                <p>
                  <strong>Comment:</strong> {c.content}
                </p>
                <p>
                  <strong>Author:</strong> {c.userProfile.displayName}
                </p>
                <p>
                  <strong>Date Created:</strong>{" "}
                  {c.createDateTime.toLocaleString()}
                </p>
              </div>
            ))}
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );
};
