/* 
Author(s): Calvin Curry, Daniel Hero
Component Responsibility: Renders a list of user posts. If the ALL POSTS button
is clicked, the user can view a list of all user posts. If the MY POSTS button is clicked, 
a list of posts created by that specific user will be rendered.
*/

import React, { useContext, useEffect, useState } from "react";
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
        let categoryMatch = categories.find((category) => {
          return category.id === categoryValue;
        });
        setDropdownHeaderValue(categoryMatch.name);
        getPostsByCategoryByUser(user.id, categoryValue);
      }

      setButtonValue("All Posts");
      setHeaderValue("My Posts");
    } else {
      if (categoryValue === null) {
        getAllPosts();
        setDropdownHeaderValue("Posts By Category");
      } else {
        let categoryMatch = categories.find((category) => {
          return category.id === categoryValue;
        });
        setDropdownHeaderValue(categoryMatch.name);
        getPostsByCategory(categoryValue);
      }
      setButtonValue("My Posts");
      setHeaderValue("All Posts");
    }
  }, [myView, categoryValue]);

  const conditionalRender = () => {
    if (posts.length > 0) {
      return (
        <div className="cards-column">
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      );
    } else {
      return <h3>No posts in this category</h3>;
    }
  };

  return (
    <>
      <Button id="postToggleButton" onClick={() => toggleButton()}>
        {buttonValue}
      </Button>
      <Button onClick={toggleModal}>Add Post</Button>
      <UncontrolledDropdown>
        <DropdownToggle caret>{dropdownHeaderValue}</DropdownToggle>
        <DropdownMenu value={categoryValue} type="select">
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
          <DropdownItem
            onClick={(e) => {
              setCategoryValue(null);
            }}
          >
            {"All Categories"}
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>

      <div className="container">
        <h2 id="postListHeader">{headerValue}</h2>
        <div className="row justify-content-center">{conditionalRender()}</div>
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
