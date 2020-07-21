/* 
Author(s): Billy Blackman
Component Responsibilty: Allows users to associate (add) and unassociate (remove)
tags from posts, essentially creating and deleting Post-Tag relationships in 
the database.
*/
import React, { useContext, useEffect } from "react";
import { Button, ListGroup, ListGroupItem } from "reactstrap";
import { TagContext } from "../../providers/TagProvider";
import "../../styles/Button.css";

export const PostTagForm = (props) => {
  const {
    postTags,
    tags,
    getAllTags,
    addTagToPost,
    deleteTagFromPost,
    getPostTagsByPostId,
  } = useContext(TagContext);

  const constructPostTag = (postId, tagId) => {
    addTagToPost({
      postId: postId,
      tagId: tagId,
    });
  };

  useEffect(() => {
    getPostTagsByPostId(props.postId);
    getAllTags();
  }, [postTags]);

  //Post-tag relationships matching current post
  const associatedPostTags = props.postTags;

  //Tags currently on current post
  const associatedTags = tags.filter((tag) =>
    associatedPostTags.find((postTag) => postTag.tagId === tag.id)
  );

  //Tags NOT currently on current post
  const nonAssociatedTags = tags.filter((tag) => {
    const matchingPostTag = postTags.find(
      (postTag) => postTag.tagId === tag.id
    );
    if (matchingPostTag) {
      return null;
    } else {
      return tag;
    }
  });

  //Matches tag to post-tag relationship
  const postTagMatchingTag = (tagId) => {
    const matchingPostTag = associatedPostTags.find((postTag) => {
      return postTag.tagId === tagId;
    });
    return matchingPostTag.id;
  };

  return (
    <>
      <ListGroup>
        Add:
        <ListGroupItem>
          {nonAssociatedTags.map((tag) => {
            return (
              <span key={`non-associatedTag--${tag.id}`}>
                <Button
                  key={tag.id}
                  color="primary"
                  outline
                  onClick={() => constructPostTag(props.postId, tag.id)}
                >
                  + {tag.name}
                </Button>
              </span>
            );
          })}
        </ListGroupItem>
        <br />
        Delete:
        <ListGroupItem>
          {associatedTags.map((tag) => {
            return (
              <span key={`associatedTag--${tag.id}`}>
                <Button
                  key={tag.id}
                  color="primary"
                  onClick={() => deleteTagFromPost(postTagMatchingTag(tag.id))}
                >
                  X {tag.name}
                </Button>
              </span>
            );
          })}
        </ListGroupItem>
        <br />
        <Button color="success" onClick={props.toggle}>
          Save Tags
        </Button>
      </ListGroup>
    </>
  );
};
