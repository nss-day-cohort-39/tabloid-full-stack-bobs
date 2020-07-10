import React, { useContext, useEffect, useRef } from 'react';
import { CategoryContext } from '../../providers/CategoryProvider';
import { PostContext } from '../../providers/PostProvider';
import { Button, Form } from 'reactstrap';
import { useHistory } from 'react-router-dom';

export default ({ toggleModal }) => {

    const { categories, getAllCategories } = useContext(CategoryContext)
    const userProfile = JSON.parse(sessionStorage.getItem("userProfile"))
    const form = document.querySelector(".postForm")
    const { addPost } = useContext(PostContext)
    const publicationDate = useRef()
    const history = useHistory()
    const category = useRef()
    const imageUrl = useRef()
    const content = useRef()
    const title = useRef()

    const createPost = () => {
        addPost({
            title: title.current.value,
            content: content.current.value,
            imageLocation: imageUrl.current.value,
            createDateTime: new Date().toJSON(),
            publishDateTime: publicationDate.current.value,
            isApproved: true,
            categoryId: category.current.value,
            userProfileId: userProfile.id
        })
    }

    useEffect(() => {
        getAllCategories();
    }, []);

    return (
        <Form className="postForm">
            <h3>Create a new Post</h3>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title" className="form-label">Title:</label>
                    <input type="text" name="title" required className="form-control"
                        placeholder="type title here..."
                        ref={title}
                        id="postTitle"
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="content" className="form-label">Content:</label>
                    <input type="text" name="content" required className="form-control"
                        placeholder="type caption here..."
                        ref={content}
                        id="postContent"
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="category" className="form-label">Category:</label>
                    <input type="text" name="caption" required className="form-control"
                        placeholder="type caption here..."
                        ref={category}
                        id="postCategory"
                    />
                    <select useRef={category}>
                        {
                            categories.map(c => {
                                return <option value={c.id}>{c.name}</option>
                            })
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="imageUrl" className="form-label">Image Url:</label>
                    <input type="text" name="imageUrl" required className="form-control"
                        placeholder="type url here..."
                        ref={imageUrl}
                        id="postImage"
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="publication date" className="form-label">Publication Date:</label>
                    <input type="date" name="publicationDAte" required className="form-control"
                        ref={publicationDate}
                        id="postPublicationDate"
                    />
                </div>
            </fieldset>
            <Button type="submit" className="btn btn-primary"
                onClick={evt => {
                    evt.preventDefault()
                    createPost()
                    toggleModal()
                }}>
                Save New Post
            </Button>
            <Button onClick={() => toggleModal()}>
                Cancel
            </Button>

        </Form>
    )
}