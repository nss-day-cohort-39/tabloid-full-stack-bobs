import React, { useContext, useEffect, useState, useRef } from "react";
import { PostContext } from "../../providers/PostProvider";
import { CategoryContext } from "../../providers/CategoryProvider";
import Post from "./Post";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  UncontrolledDropdown,
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
  const [modal, setModal] = useState(false);
  const [categoryValue, setCategoryValue] = useState(null);
  const [buttonValue, setButtonValue] = useState("");
  const [headerValue, setHeaderValue] = useState("");
  const [dropdownHeaderValue, setDropdownHeaderValue] = useState("");
  const user = JSON.parse(sessionStorage.getItem("userProfile"));
  const category = useRef();

  const toggleButton = () => {
    setMyView(!myView);
    setCategoryValue(null);
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    getAllCategories();
    if (myView === true) {
      if (categoryValue === null) {
        getPostsByUserProfileId(user.id);
        setDropdownHeaderValue("Posts By Category");
      } else {
        setDropdownHeaderValue();
        getPostsByCategoryByUser(user.id, parseInt(categoryValue));
      }

      setButtonValue("All Posts");
      setHeaderValue("My Posts");
    } else {
      if (categoryValue === null) {
        getAllPosts();
        setDropdownHeaderValue("Posts By Category");
      } else {
        setDropdownHeaderValue();
        getPostsByCategory(parseInt(categoryValue));
      }

      setButtonValue("My Posts");
      setHeaderValue("All Posts");
    }
  }, [myView, categoryValue]);

  return (
    <>
      <Button id="postToggleButton" onClick={() => toggleButton()}>
        {buttonValue}
      </Button>
      <Button onClick={toggleModal}>Add Post</Button>
      <UncontrolledDropdown>
        <DropdownToggle caret>{dropdownHeaderValue}</DropdownToggle>
        <DropdownMenu value={categoryValue} type="select" innerRef={category}>
          {categories.map((category) => {
            if (category.isDeleted === false)
              return (
                <DropdownItem
                  key={category.id}
                  value={category.id}
                  onClick={(e) => {
                    setCategoryValue(category.id);
                  }}
                >
                  {category.name}
                </DropdownItem>
              );
          })}
        </DropdownMenu>
      </UncontrolledDropdown>

      <div className="container">
        <h2 id="postListHeader">{headerValue}</h2>
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
