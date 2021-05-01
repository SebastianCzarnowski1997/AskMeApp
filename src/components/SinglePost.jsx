import React, { useEffect, useState } from 'react';
import {createUseStyles} from 'react-jss'
import ComentsList from './ComentsList';
import NewComent from './NewComent';

const SinglePost = (props) => {
  const { currentUser, post, createComent } = props;
  const classes = useStyles()
  return (
    <div className={classes.SinglePost}>
      <div className="containerYEs">
      post content: {post.content} < br/>
      author: {post.authorDisplayName} < br/>
      {post.place &&
        <div>
          post created in: {post.place}
        </div>
      }
      < br/>
      <ComentsList coments={post.coments}/>
      < br/>
        <NewComent docId={post.docId} createComent={createComent} currentUser={currentUser} />
      </div>
    </div>
  )
}

const useStyles = createUseStyles({
  SinglePost: {

  }
})

export default SinglePost;
