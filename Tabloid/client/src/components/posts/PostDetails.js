import React, { useEffect, useContext, useState } from "react";
import { PostContext } from "../../providers/PostProvider";
import { Card, CardImg, CardBody, Button } from "reactstrap";
import { Link, useParams, useHistory } from "react-router-dom";

const PostDetails = () => {
    const { id } = useParams()
    const { getPostById, deletePost } = useContext(PostContext)
    const [post, setPost] = useState({ userProfile: {} })
    const history = useHistory()

    useEffect(() => {
        getPostById(id).then(setPost)
    }, [])

    const [deleteModal, setDeleteModal] = useState(false);
    const toggleDelete = () => setDeleteModal(!deleteModal);

    return (
        <>
            <Card className="m-4">
                <p className="text-left px-2">
                </p>
                <CardImg top src={post.imageLocation} alt={post.title} />
                <CardBody>
                    <p><strong>{post.title}</strong></p>
                    <p> {post.content}</p>
                    <p>{post.publishDateTime}</p>
                    <p>Author: {post.userProfile.displayName}</p>
                </CardBody>
                <Button id='backToPosts' onClick={() => history.push("/posts")}>Back</Button>
                <Button color="danger" onClick={toggleDelete}>Delete</Button>
            </Card>
            <Modal isOpen={deleteModal}>
                <div>
                    Are you sure you want to delete this post?
          <Button
                        color="danger"
                        onClick={(e) => {
                            e.preventDefault();
                            deletePost(post.id);
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