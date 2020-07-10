import React from "react";
import { Card, CardImg, CardBody } from "reactstrap";
import { Link } from "react-router-dom";



const Post = ({ post }) => {
    return (
        <Card className="m-4">

            <CardImg top src={post.imageLocation} alt={post.title} />
            <CardBody>
                <Link to={`/posts/${post.id}`}>
                    <strong>{post.title}</strong>
                </Link>
                <p>Author: {post.userProfile.displayName}</p>
                {/* <p>Category: {post.category.name}</p> */}
            </CardBody>
        </Card>
    );
};

export default Post;