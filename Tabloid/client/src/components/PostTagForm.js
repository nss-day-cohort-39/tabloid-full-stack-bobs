import React, { useContext, useEffect } from "react";
import { Button, Form, Badge } from 'reactstrap';
import { TagContext } from "../providers/TagProvider";
import { PostContext } from "../providers/PostProvider";

export const PostTagForm = (props) => {

    const { postTags, tags, getAllTags, addTagToPost, deleteTagFromPost, getPostTagsByPostId } = useContext(TagContext);

    useEffect(() => {
        getAllTags();
      }, []);

    const constructPostTag = (postId, tagId) => {
        return addTagToPost({
            postId: postId,
            tagId: tagId
        })
    }

    const associatedPostTags = props.postTags;


    return (
        <>
            <ul>
            {
                tags.map((tag) => {
                    const foundPost = associatedPostTags.find(pt => pt.tagId === tag.id)
                    if (foundPost) {
                        return <></>
                    } else {
                        debugger
                        return (
                            <>
                                <Button color="primary" outline onClick={() => constructPostTag(props.postId, tag.id)}>
                                    {tag.name}
                                </Button>
                            </>
                        )
                    } 
                })
            }
            </ul>
        </>
    )


}


