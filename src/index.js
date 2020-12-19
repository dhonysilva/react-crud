import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Edit from './components/Edit';
import Create from './components/Create';
import Show from './components/Show';



ReactDOM.render(
  <Router>
    <div>
    <Route exact path='/' component={App} />
    <Route exact path='/edit/:id' component={Edit} />
    <Route exact path='/create' component={Create} />
    <Route exact path='/show/:id' component={Show} />
    </div>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
