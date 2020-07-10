import React, { useEffect, useContext, useState } from "react";
import { PostContext } from "../../providers/PostProvider";
import { Card, CardImg, CardBody } from "reactstrap";
import { Link, useParams } from "react-router-dom";

const PostDetails = () => {
    const { id } = useParams()
    const { getPostById } = useContext(PostContext)
    const [post, setPost] = useState({ userProfile: {} })

    useEffect(() => {
        getPostById(id).then(setPost).then(() => console.log(post))
    }, [])

    return (
        <Card className="m-4">
            <p className="text-left px-2">
            </p>
            <CardImg top src={post.imageLocation} alt={post.title} />
            <CardBody>
                <p><strong>{post.title}</strong></p>
                <p> {post.content}</p>
                <p>{post.publishDateTime}</p>
                <p>Author: {post.userProfile.displayName}</p>
            </CardBody>
        </Card>
    );
};

export default PostDetails;