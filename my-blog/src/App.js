import React from 'react';
import './App.css';
import { HomePage } from './pages/HomePage';
import { Route, Switch } from 'react-router-dom'
import { AboutPage } from './pages/AboutPage';
import { ArticlesListPage } from './pages/ArticlesListPage';
import { ArticlePage } from './pages/ArticlePage';
import { NavBar } from './NavBar';
import { NotFoundPage } from './pages/NotFoundPage';



function App() {
  return (
    <div className="container">
      <NavBar />
      <div id="page-body">
        <Switch>
          <Route path='/' component={HomePage} exact />
          <Route path='/about' component={AboutPage} />
          <Route path='/articleslist' component={ArticlesListPage} />
          <Route path='/article/:name' component={ArticlePage} />
          <Route component={NotFoundPage} />
        </Switch>

      </div>
    </div>

  );
}

export default App;
