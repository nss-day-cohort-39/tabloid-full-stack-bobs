import React from "react";
import { Card, CardImg, CardBody } from "reactstrap";



const Post = ({ post }) => {
    return (
        <Card className="m-4">

            <CardImg top src={post.imageLocation} alt={post.title} />
            <CardBody>
                <p><strong>{post.title}</strong></p>
                <p>Author: {post.userProfile.displayName}</p>
                {/* <p>Category: {post.category.name}</p> */}
            </CardBody>
        </Card>
    );
};

export default Post;