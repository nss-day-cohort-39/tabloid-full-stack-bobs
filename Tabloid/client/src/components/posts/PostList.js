import React, { useContext, useEffect, useState, useRef } from "react";
import { PostContext } from "../../providers/PostProvider"
import Post from "./Post";
import { Button } from 'reactstrap';



const PostList = () => {
    const { getAllPosts, posts, getPostsByUserProfileId } = useContext(PostContext);
    const [myView, setMyView] = useState(false)
    const [list, setList] = useState(posts)
    const user = JSON.parse(sessionStorage.getItem("userProfile"))
    const [userPosts, setUserPosts] = useState([])
    const toggleButton = () => {
        setMyView(!myView)
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
                onClick={() => toggleButton()}>My Posts</Button>
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
        </>
    );
};

export default PostList;