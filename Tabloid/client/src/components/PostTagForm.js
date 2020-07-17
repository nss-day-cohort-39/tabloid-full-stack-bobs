import React, { useContext, useEffect } from "react";
import { Button, Form, Badge, ListGroup, ListGroupItem } from 'reactstrap';
import { TagContext } from "../providers/TagProvider";
import { PostContext } from "../providers/PostProvider";

export const PostTagForm = (props) => {

    const { postTags, getAllPostTags, tags, getAllTags, addTagToPost, deleteTagFromPost, getPostTagsByPostId } = useContext(TagContext);

    const constructPostTag = (postId, tagId) => {
        debugger
        addTagToPost({
            postId: postId,
            tagId: tagId
        })
    }

    useEffect(() => {
        getPostTagsByPostId(props.postId);
        getAllTags();
      }, [postTags]);


    
      
    //Post-tag relationships matching current post
    const associatedPostTags = props.postTags;
      
    //Tags currently on current post
    const associatedTags = tags.filter(tag => associatedPostTags.find(postTag => postTag.tagId === tag.id));

    //Tags NOT currently on current post
    const nonAssociatedTags = tags.filter((tag) => {
        const matchingPostTag = postTags.find(postTag => postTag.tagId === tag.id);
        if (matchingPostTag) {
            return null
        } else {
            return tag
        }
    });

    //Matches tag to post-tag relationship
    const postTagMatchingTag = (tagId) => {
        const matchingPostTag = associatedPostTags.find(postTag => {
           return (postTag.tagId === tagId);
        }) 
        return matchingPostTag.id;
    }
      
    debugger

    return (
        <>
            <ListGroup>
            Add:
            <ListGroupItem>
                {
                    nonAssociatedTags.map((tag) => {
                        return (
                            <>
                                <Button key={tag.id} color="primary" outline onClick={() => constructPostTag(props.postId, tag.id)}>
                                    {tag.name}
                                </Button>
                            </>
                        )
                    })
                }
            </ListGroupItem>
            Delete:
            <ListGroupItem>
                {
                    associatedTags.map((tag) => {
                        return (
                            <>
                                <Button key={tag.id} color="primary" onClick={() => deleteTagFromPost(postTagMatchingTag(tag.id))}>
                                    {tag.name} X
                                </Button>
                            </>
                        )
                    })
                }
            </ListGroupItem>

            <Button onClick={props.toggle}>
                Save Tags
            </Button>

            </ListGroup>
        </>
    )


}


