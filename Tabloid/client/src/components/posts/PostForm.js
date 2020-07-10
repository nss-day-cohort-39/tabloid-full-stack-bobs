import React from 'react';

export default () => {

    const imageUrl = useRef()
    const { getUserProfile } = useContext(UserProfileContext)
    const title = useRef()
    const content = useRef()
    const userProfile = JSON.parse(sessionStorage.getItem("userProfile"))
    const { addPost } = useContext(PostContext)
    const history = useHistory()
    const form = document.querySelector(".gifForm")
    const createNewGif = () => {
        addPost({
            title: title.current.value,
            imageUrl: imageUrl.current.value,
            caption: caption.current.value,
            dateCreated: new Date().toJSON(),
            userProfileId: userProfile.id
        })
    }

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
                        ref={caption}
                        id="postCategory"
                    />
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
                    createNewGif()
                    history.push("/")
                }}>
                Save New Gif
                </Button>
        </Form>
    )
}