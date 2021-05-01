import React from 'react';

const ComentsList = (props) => {
  const { coments } = props;
  return (
    <div>
      {coments.map((comment, i) => (
        <div key={i}>
          Coment created by: {comment.authorDisplayName} <br />
          Coment content: {comment.coment} <br />
        </div>
      ))}
    </div>
  )
}
export default ComentsList;