import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, hashHistory} from 'react-router'
import App, {HomePage, Recipe, Search, Results} from './App';
import './index.css';

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={HomePage} />
            <Route path="recipe/:id" component={Recipe} />
            <Route path="search" component={Search} />
            <Route path="search/results" component={Results}/>
        </Route>
    </Router>,
    document.getElementById('root')
);
