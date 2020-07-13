import React, { useEffect, useContext, useState } from "react";
import { PostContext } from "../../providers/PostProvider";
import { Card, CardImg, CardBody, Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { Link, useParams, useHistory } from "react-router-dom";
import { EditPostForm } from "../posts/EditPostForm";

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

    const [editModal, setEditModal] = useState(false);
    const toggleEdit = () => setEditModal(!editModal);

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
                <Button color="info" onClick={toggleEdit}> Edit </Button>
                <Button color="danger" onClick={toggleDelete}> Delete </Button>
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
                        }}>
                        Yes, delete
                </Button>
                    <Button color="secondary"
                        onClick={toggleDelete}>
                        No, go back
                    </Button>
                </div>
            </Modal>
        </>
    );
};

export default PostDetails;