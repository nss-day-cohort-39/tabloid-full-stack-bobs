import React, { useContext, useEffect, useState, useRef } from "react";
import { PostContext } from "../../providers/PostProvider"
import Post from "./Post";
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';



const PostList = () => {
    const { getAllPosts, posts, getPostsByUserProfileId } = useContext(PostContext);
    const [myView, setMyView] = useState(false)
    const [list, setList] = useState(posts)
    const user = JSON.parse(sessionStorage.getItem("userProfile"))
    const [userPosts, setUserPosts] = useState([])
    const [modal, setModal] = useState(false)

    const toggleButton = () => {
        setMyView(!myView)
    }

    const toggleModal = () => {
        setModal(!modal)
    }

    useEffect(() => {
        getAllPosts()
            .then(() => {
                getPostsByUserProfileId(user.id)
                    .then(setUserPosts)
            })
    }, []);

    useEffect(() => {
        if (myView === true) {
            setList(userPosts)
            document.getElementById("postToggleButton").innerHTML = "All Posts";
        } else {
            setList(posts)
            document.getElementById("postToggleButton").innerHTML = "My Posts";
        }
    }, [myView]);

    return (
        <>
            <Button id="postToggleButton"
                onClick={() => toggleButton()}>My Posts
            </Button>
            <Button>New Post</Button>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="cards-column">
                        {
                            list.map((post) => (
                                <Post key={post.id} post={post} />
                            ))}
                    </div>
                </div>
            </div>
            <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}></ModalHeader>
                <ModalBody></ModalBody>
            </Modal>
        </>
    );
};

export default PostList;