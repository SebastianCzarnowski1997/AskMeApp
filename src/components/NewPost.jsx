import React, { useState } from 'react';

const NewPost = (props) => {
  const { currentUser } = props;
  const [postContent, setPostContent] = useState('');
  const handleCreateComment = (event) => {
    event.preventDefault();
    props.createPost(postContent)
    setPostContent('')
  }
  return (
    <div className="maininput">
      {currentUser.id &&
        <form onSubmit={handleCreateComment}>
        <input
            placeholder="Write question"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          />
          <button type="submit"> Submit </button>
        </form>
      }
    </div>
  );
};


export default NewPost;
