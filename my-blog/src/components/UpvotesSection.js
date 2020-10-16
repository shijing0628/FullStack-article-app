import React from 'react'

export const UpvotesSection = ({ articleName, upvote, setArticleInfo }) => {
 const upvoteArticle = async () => {
  const result = await fetch(`/api/articles/${articleName}/upvote`, {
   method: "POST",
  });
  const body = await result.json();
  setArticleInfo(body)
 }

 return (
  <div id="upvote-section">
   <button onClick={() => upvoteArticle()}>Add Upvote</button>
   <p>This post has been upvoted {upvote} times</p>
  </div>
 )
}
