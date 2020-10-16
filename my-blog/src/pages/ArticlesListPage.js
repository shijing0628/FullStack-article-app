import React from 'react'
import articleContent from './article-content'

import { ArticlesList } from '../components/ArticlesList'

// Article list with link can clickable
export const ArticlesListPage = () => {
 return (
  <>
   <h1>Articles list</h1>
   <ArticlesList articles={articleContent} />

  </>
 )
}
