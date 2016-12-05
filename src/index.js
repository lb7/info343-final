import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, hashHistory} from 'react-router'
import App from './App';
import Search from './Search';
import Results from './Results';
import Recipe from './Recipe';
import HomePage from './HomePage';
import * as firebase from 'firebase';

import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';

import './index.css';
import './css/search.css';

const config = {
    apiKey: "AIzaSyCIti-HKJ951qi2jSZ9mepk9pz1Hf88KNo",
    authDomain: "info343-final-35daa.firebaseapp.com",
    databaseURL: "https://info343-final-35daa.firebaseio.com",
    storageBucket: "info343-final-35daa.appspot.com",
    messagingSenderId: "238150461718"
};
firebase.initializeApp(config);

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
