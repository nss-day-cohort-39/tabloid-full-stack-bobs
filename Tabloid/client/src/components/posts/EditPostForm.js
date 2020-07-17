import React, { useContext, useState, useEffect } from "react";
import { PostContext } from "../../providers/PostProvider";
import { CategoryContext } from "../../providers/CategoryProvider";
import { Button, Form } from "reactstrap";
import { useHistory } from "react-router-dom";
import "../../styles/Button.css";

export const EditPostForm = (props) => {
  const { updatePost } = useContext(PostContext);
  const { categories, getAllCategories } = useContext(CategoryContext);
  const [updatedPost, setPost] = useState(props.post);
  const history = useHistory();

  const handleControlledInputChange = (event) => {
    const newPost = Object.assign({}, updatedPost);
    newPost[event.target.name] = event.target.value;
    setPost(newPost);
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const editPost = () => {
    updatedPost.categoryId = parseInt(updatedPost.categoryId);
<<<<<<< HEAD
    updatePost(updatedPost).then(props.toggle).then(history.push("/posts"));
  };

  return (
    <>
      <Form className="editPostForm">
        <fieldset>
          <div className="form-group">
            <label htmlFor="title">
              Title:
              <input
                type="text"
                name="title"
                required
                autoFocus
                className="form-control"
                placeholder="Edit post title"
                defaultValue={props.post.title}
                onChange={handleControlledInputChange}
              />
              Content:
              <input
                type="textarea"
                name="content"
                rows="20"
                columns="50"
                required
                autoFocus
                className="form-control"
                placeholder="Edit content"
                defaultValue={props.post.content}
                onChange={handleControlledInputChange}
              />
              Category:
              <select
                name="categoryId"
                required
                className="form-control"
                defaultValue={props.post.categoryId}
                onChange={handleControlledInputChange}
              >
                <option value={props.post.categoryId}>
                  {props.post.category.name}
                </option>
                {
                  categories.map((e) => (
                    (e.id === props.post.categoryId)
                      ? null
                      : <option key={e.id} value={e.id}>{e.name}</option>
                  ))
                }
              </select>
              Header Image:
              <input
                type="text"
                name="imageLocation"
                className="form-control"
                placeholder="Edit post image"
                defaultValue={props.post.imageLocation}
                onChange={handleControlledInputChange}
              />
              Published Date:
              <input
                type="date"
                name="publishDateTime"
                className="form-control"
                placeholder="Edit publish date"
                defaultValue={props.post.publishDateTime.split("T")[0]}
                onChange={handleControlledInputChange}
              />
            </label>
          </div>
        </fieldset>

=======

    updatePost(updatedPost).then(props.toggle).then(history.push("/posts"));
  };

  return (
    <>
      <Form className="editPostForm">
        <fieldset>
          <div className="form-group">
            <label htmlFor="title">
              Title:
              <input
                type="text"
                name="title"
                required
                autoFocus
                className="form-control"
                placeholder="Edit post title"
                defaultValue={props.post.title}
                onChange={handleControlledInputChange}
              />
              Content:
              <input
                type="textarea"
                name="content"
                rows="20"
                columns="50"
                required
                autoFocus
                className="form-control"
                placeholder="Edit content"
                defaultValue={props.post.content}
                onChange={handleControlledInputChange}
              />
              Category:
              <select
                name="categoryId"
                required
                className="form-control"
                defaultValue={
                  props.post.category.isDeleted ? null : props.post.categoryId
                }
                onChange={handleControlledInputChange}
              >
                <option
                  value={
                    props.post.category.isDeleted ? null : props.post.categoryId
                  }
                >
                  {props.post.category.isDeleted
                    ? "Select a Category"
                    : props.post.category.name}
                </option>
                {categories.map((e) =>
                  e.isDeleted ? null : (
                    <option key={e.id} value={e.id}>
                      {e.name}
                    </option>
                  )
                )}
              </select>
              Header Image:
              <input
                type="text"
                name="imageLocation"
                className="form-control"
                placeholder="Edit post image"
                defaultValue={props.post.imageLocation}
                onChange={handleControlledInputChange}
              />
              Published Date:
              <input
                type="date"
                name="publishDateTime"
                className="form-control"
                placeholder="Edit publish date"
                defaultValue={props.post.publishDateTime.split("T")[0]}
                onChange={handleControlledInputChange}
              />
            </label>
          </div>
        </fieldset>

>>>>>>> 897ddc597a903f7d14693c3415ad4608918b76f4
        <Button
          color="primary"
          onClick={(e) => {
            e.preventDefault();
            editPost();
          }}
        >
          Save Updates
        </Button>
        <Button onClick={props.toggle}>Cancel</Button>
      </Form>
    </>
  );
};
