import React, { useState, useEffect } from 'react'
import { AddCommentForm } from '../components/AddCommentForm';
import { ArticlesList } from '../components/ArticlesList';
import { CommentsList } from '../components/CommentsList';
import { UpvotesSection } from '../components/UpvotesSection';
import articleContent from './article-content'
import { NotFoundPage } from './NotFoundPage';

export const ArticlePage = ({ match }) => {
 const [articleInfo, setArticleInfo] = useState({ upvote: 0, comments: [] });
 const name = match.params.name;
 const article = articleContent.find(article => article.name === name)

 // when goes to different article page, vote will update, use fetch to get data from DB, setState get updated info
 useEffect(() => {
  const fetchData = async () => {
   const result = await fetch(`/api/articles/${name}`)
   const body = await result.json()
   setArticleInfo(body);
  }
  fetchData();
 }, [name]);


 if (!article) return <NotFoundPage />

 // add related articles
 const otherArticles = articleContent.filter(article => article.name !== name)

 return (
  <div>
   <h1>{article.title} </h1>
   <UpvotesSection articleName={name} upvote={articleInfo.upvote} setArticleInfo={setArticleInfo} />
   {article.content.map((para, key) =>
    <p key={key}>{para}</p>
   )}
   <br />
   <hr />
   <br />
   <CommentsList comments={articleInfo.comments} />
   <AddCommentForm setArticleInfo={setArticleInfo} articleName={name} />
   <h3>Other interested articles</h3>
   <ArticlesList articles={otherArticles} />
  </div>
 )
}
