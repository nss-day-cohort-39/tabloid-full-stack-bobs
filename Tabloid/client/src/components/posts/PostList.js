import React, { useContext, useEffect, useState, useRef } from "react";
import { PostContext } from "../../providers/PostProvider";
import { CategoryContext } from "../../providers/CategoryProvider";
import Post from "./Post";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
} from "reactstrap";
import PostForm from "./PostForm";

const PostList = () => {
  const {
    getAllPosts,
    posts,
    getPostsByUserProfileId,
    getPostsByCategory,
    getPostsByCategoryByUser,
  } = useContext(PostContext);
  const { categories, getAllCategories } = useContext(CategoryContext);
  const [myView, setMyView] = useState(false);
  const [list, setList] = useState(posts);
  const user = JSON.parse(sessionStorage.getItem("userProfile"));
  const [userPosts, setUserPosts] = useState([]);
  const [modal, setModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [categoryValue, setCategoryValue] = useState(0);
  const category = useRef();

  const toggleButton = () => {
    setMyView(!myView);
    setCategoryValue(0);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    getAllCategories();
    if (myView === true) {
      if (categoryValue === 0) {
        // setList(userPosts)
        getPostsByUserProfileId(user.id);
      } else {
        getPostsByCategoryByUser(user.id, parseInt(categoryValue));
      }
      document.getElementById("postListHeader").innerHTML = "My Posts";
      document.getElementById("postToggleButton").innerHTML = "All Posts";
    } else {
      if (categoryValue === 0) {
        // setList(posts)
        getAllPosts();
      } else {
        getPostsByCategory(parseInt(categoryValue));
      }
      document.getElementById("postListHeader").innerHTML = "All Posts";
      document.getElementById("postToggleButton").innerHTML = "My Posts";
    }
  }, [myView, categoryValue]);

  return (
    <>
      <Button id="postToggleButton" onClick={() => toggleButton()}>
        My Posts
      </Button>
      <Button onClick={toggleModal}>Add Post</Button>

      <Input
        value={categoryValue}
        type="select"
        onChange={(e) => {
          setCategoryValue(category.current.value);
        }}
        innerRef={category}
      >
        <option value="0">Select a Category</option>
        {categories.map((category) => {
          return (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          );
        })}
      </Input>

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
