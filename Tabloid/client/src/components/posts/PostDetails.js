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
import { CommentContext } from "../../providers/CommentProvider";
import { PostComment } from "../PostComment";
import { TagContext } from "../../providers/TagProvider";
import { PostTagForm } from "../PostTagForm";
import "../../styles/Button.css";
import "../../styles/Modal.css";

const PostDetails = () => {
  const { id } = useParams();
  const { getPostById, deletePost } = useContext(PostContext);
  const { getPostTagsByPostId, postTags, getAllPostTags, addTagToPost, deleteTagFromPost } = useContext(TagContext);
  const [post, setPost] = useState({ userProfile: {} });
  const history = useHistory();

  const { comments, getCommentsByPostId } = useContext(CommentContext);

  useEffect(() => {
    getPostById(id).then(setPost);
    getCommentsByPostId(id);
    getPostTagsByPostId(id);
  }, []);

  const [deleteModal, setDeleteModal] = useState(false);
  const toggleDelete = () => setDeleteModal(!deleteModal);

  const [editModal, setEditModal] = useState(false);
  const toggleEdit = () => setEditModal(!editModal);

  const [postTagModal, setPostTagModal] = useState(false);
  const togglePostTag = () => setPostTagModal(!postTagModal);

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
        <PostComment comments={comments} postId={parseInt(id)} />
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
        <Modal isOpen={postTagModal}>
          <ModalBody>
            <PostTagForm postId={parseInt(id)} postTags={postTags}  toggle={togglePostTag}/>
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
          <br />
          <br />
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

