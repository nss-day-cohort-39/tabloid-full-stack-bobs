import React, { useContext, useEffect, useState, useRef } from "react";
import { PostContext } from "../../providers/PostProvider";
import Post from "./Post";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import PostForm from "./PostForm";

const PostList = () => {
  const { getAllPosts, posts, getPostsByUserProfileId } = useContext(
    PostContext
  );
  const [myView, setMyView] = useState(false);
  const [list, setList] = useState(posts);
  const user = JSON.parse(sessionStorage.getItem("userProfile"));
  const [userPosts, setUserPosts] = useState([]);
  const [modal, setModal] = useState(false);

  const toggleButton = () => {
    setMyView(!myView);
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    if (myView === true) {
      // setList(userPosts)
      getPostsByUserProfileId(user.id);
      document.getElementById("postListHeader").innerHTML = "My Posts";
      document.getElementById("postToggleButton").innerHTML = "All Posts";
    } else {
      // setList(posts)
      getAllPosts();
      document.getElementById("postListHeader").innerHTML = "All Posts";
      document.getElementById("postToggleButton").innerHTML = "My Posts";
    }
  }, [myView]);

  return (
    <>
      <Button id="postToggleButton" onClick={() => toggleButton()}>
        My Posts
      </Button>
      <Button onClick={toggleModal}>Add Post</Button>
      <div className="container">
        <h2 id="postListHeader">All Posts</h2>
        <div className="row justify-content-center">
          <div className="cards-column">
            {posts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}></ModalHeader>
        <ModalBody>
          <PostForm toggleModal={toggleModal} />
        </ModalBody>
      </Modal>
    </>
  );
};

export default PostList;
