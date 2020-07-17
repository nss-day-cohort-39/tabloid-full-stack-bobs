import React, { useContext, useEffect } from "react";
import { Button, Form, Badge } from 'reactstrap';
import { TagContext } from "../providers/TagProvider";
import { PostContext } from "../providers/PostProvider";

export const PostTagForm = (props) => {

    const { postTags, getAllPostTags, tags, getAllTags, addTagToPost, deleteTagFromPost, getPostTagsByPostId } = useContext(TagContext);

    const constructPostTag = (postId, tagId) => {
        addTagToPost({
            postId: postId,
            tagId: tagId
        })
    }

    useEffect(() => {
        getPostTagsByPostId(props.postId);
        getAllTags();
      }, []);
    
      
    const associatedPostTags = props.postTags;
      
    const associatedTags = tags.filter(tag => associatedPostTags.find(postTag => postTag.tagId === tag.id));

    const postTagMatchingTag = (tagId, postId) => {
        const matchingPostTag = associatedPostTags.find(postTag => {
            return postTag.tagId === tagId && postTag.postId === postId
        })
        return matchingPostTag.id;
    }
      
    debugger

    return (
        <>
            <ul>
            {
                tags.map((tag) => {
                    const foundPost = associatedPostTags.find(pt => pt.tagId === tag.id)
                    if (foundPost) {
                        return <></>
                    } else {
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

            <ul>
            {
                associatedPostTags.map((postTag) => {
                    const foundTag = tags.find(tag => postTag.tagId === tag.id)
                    if (foundTag === undefined) {
                        return <></>
                    } else {
                        return (
                            <>
                                <Button color="primary" onClick={() => deleteTagFromPost(postTag.id)}>
                                    {foundTag.name} X
                                </Button>
                            </>
                        ) 
                    }
                })
            }
            </ul>

            <Button onClick={props.toggle}>
                Save Tags
            </Button>
        </>
    )


}


