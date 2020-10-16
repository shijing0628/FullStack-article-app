import React from 'react'

export const CommentsList = ({ comments }) => {
 return (
  <div className="comment">
   <h3>Comments</h3>
   {comments.map((comment, key) => (
    <div key={key}>
     <h4>{comment.username}</h4>
     <p className="comment-content">{comment.text}</p>
    </div>
   ))}
   <br></br>
   <hr></hr>
   <br></br>
  </div>
 )
}
