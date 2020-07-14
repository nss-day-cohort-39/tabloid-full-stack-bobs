import React, { useEffect, useContext, useState } from "react";
import { PostContext } from "../../providers/PostProvider";
import {
  Card,
  CardImg,
  CardBody,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { Link, useParams, useHistory } from "react-router-dom";
import { EditPostForm } from "../posts/EditPostForm";
import { TagContext } from "../../providers/TagProvider";
import { PostTagForm } from "../PostTagForm";

const PostDetails = () => {
  let { id } = useParams();
  id = parseInt(id);
  const { getPostById, deletePost } = useContext(PostContext);
  const { getPostTagsByPostId, postTags, getAllPostTags, 
            addTagToPost, deleteTagFromPost } = useContext(TagContext);
  const [post, setPost] = useState({ userProfile: {} });

  const history = useHistory();

  
    const [deleteModal, setDeleteModal] = useState(false);
    const toggleDelete = () => setDeleteModal(!deleteModal);
  
    const [editModal, setEditModal] = useState(false);
    const toggleEdit = () => setEditModal(!editModal);
  
    const [postTagModal, setPostTagModal] = useState(false);
    const togglePostTag = () => setPostTagModal(!postTagModal);

  useEffect(() => {
    getPostById(id)
    .then(setPost)
    .then(getPostTagsByPostId(id))
    // .then(getAllPostTags);
  }, [postTagModal]);

  // const associatedPostTags = getPostTagsByPostId(id);


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
          <ul>
            Tags:
            {postTags.map((pt) => {
              return <li key={pt.id}>{pt.tag.name}</li>
            })}
          </ul>
        </CardBody>
        <Button id="backToPosts" onClick={() => history.push("/posts")}>
          Back
        </Button>
        <Button color="info" onClick={toggleEdit}>
          {" "}
          Edit{" "}
        </Button>
        <Button color="danger" onClick={toggleDelete}>
          {" "}
          Delete{" "}
        </Button>
        <Button color="success" onClick={togglePostTag}>
          {" "}
          Manage Tags{" "}
        </Button>
        <Modal isOpen={postTagModal} toggle={togglePostTag}>
          <ModalBody>
            <PostTagForm postId={id} postTags={postTags}/>
          </ModalBody>
        </Modal>
      </Card>
      <Modal isOpen={editModal}>
        <ModalHeader>EDIT POST</ModalHeader>
        <ModalBody>
          <EditPostForm toggle={toggleEdit} post={post} />
        </ModalBody>
      </Modal>
      <Modal isOpen={deleteModal}>
        <div>
          Are you sure you want to delete this post?
          <Button
            color="danger"
            onClick={(e) => {
              e.preventDefault();
              deletePost(id).then(history.push("/posts"));
            }}
          >
            Yes, delete
          </Button>
          <Button color="secondary" onClick={toggleDelete}>
            No, go back
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default PostDetails;

