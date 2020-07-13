import React, { useEffect, useContext, useState } from "react";
import { PostContext } from "../../providers/PostProvider";
import { Card, CardImg, CardBody, Button } from "reactstrap";
import { Link, useParams, useHistory } from "react-router-dom";
import { TagContext } from "../../providers/TagProvider";

const PostDetails = () => {
  const { id } = useParams();
  const { getPostById } = useContext(PostContext);
  const { getTagsByPostId, tags } = useContext(TagContext);

  const [post, setPost] = useState({ userProfile: {} });
  const history = useHistory();

  useEffect(() => {
    getPostById(id).then(setPost).then(getTagsByPostId(id));
  }, []);

  return (
    <>
      <Card className="m-4">
        <p className="text-left px-2"></p>
        <CardImg top src={post.imageLocation} alt={post.title} />
        <CardBody>
          <p>
            <strong>{post.title}</strong>
          </p>
          <p> {post.content}</p>
          <p>{post.publishDateTime}</p>
          <p>Author: {post.userProfile.displayName}</p>
          <p>
            Tags:{" "}
            {tags.map((t) => (
              <>
                <p>{t.name}</p>
              </>
            ))}
          </p>
        </CardBody>
        <Button id="backToPosts" onClick={() => history.push("/posts")}>
          Back
        </Button>
      </Card>
    </>
  );
};

export default PostDetails;
