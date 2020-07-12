import React, { useContext, useState } from "react";
import { PostContext } from "../../providers/PostProvider";
import { CategoryContext } from "../../providers/CategoryProvider";
import { Button } from "reactstrap";

export const EditPostForm = (props) => {
    const { updatePost } = useContext(PostContext);
    const { categories } = useContext(CategoryContext)
    const [updatedPost, setPost] = useState(props.post);

    const handleControlledInputChange = (event) => {
        const newPost = Object.assign({}, updatedPost);
        newPost[event.target.name] = event.target.value;
        setPost(newPost);
    };

    const editPost = () => {
        const categoryId = parseInt(updatedPost.categoryId);
        updatePost(updatedPost).then(props.toggle);

        if (categoryId === 0) {
            window.alert("Please select a category");
        };

        return (
            <form className="newPostForm">
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="name">
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
                                type="text"
                                name="content"
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
                                <option value="0">Select a category</option>
                                {categories.map((e) => (
                                    <option key={e.id} value={e.id}>
                                        {e.name}
                                    </option>
                                ))}
                            </select>

                            Header Image:
                     <input
                                type="text"
                                name="imageURL"
                                autoFocus
                                className="form-control"
                                placeholder="Edit post image"
                                defaultValue={props.post.imageLocation}
                                onChange={handleControlledInputChange}
                            />
                            Published Date:
                     <input
                                type="date"
                                name="imageURL"
                                autoFocus
                                className="form-control"
                                placeholder="Edit publish date"
                                defaultValue={props.post.publishDateTime}
                                onChange={handleControlledInputChange}
                            />
                        </label>
                    </div>
                </fieldset>
                <Button
                    color="primary"
                    onClick={(e) => {
                        e.preventDefault();
                        editPost();
                    }}
                >
                    Save Updates
                </Button>
                <Button onClick={props.toggle}>
                    Cancel
                </Button>
            </form>
        );
    }
}