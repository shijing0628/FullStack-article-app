import React, { useState } from 'react'

export const AddCommentForm = ({ setArticleInfo, articleName }) => {
 const [userName, setUserName] = useState('');
 const [commentText, setCommentText] = useState('')

 const addComment = async () => {
  const result = await fetch(`/api/articles/${articleName}/add-comment`, {
   method: "POST",
   body: JSON.stringify({ userName, text: commentText }),
   headers: {
    'Content-Type': 'application/json'
   }
  });
  const body = await result.json();
  setArticleInfo(body);
  setUserName("");
  setCommentText("");
 }

 return (
  <div className="add-comments">
   <h3>Add a comment</h3>
   <label>
    Name:
    <input type="text" value={userName} onChange={e => setUserName(e.target.value)} />
   </label>

   <label>
    Comments:</label>
   <textarea rows="4" cols="50" value={commentText} onChange={e => setCommentText(e.target.value)} />

   <button className="comment-btn" onClick={() => addComment()}>Add Comments</button>


  </div>
 )
}
