import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Route, BrowserRouter as  Router, Switch } from 'react-router-dom';
import Blog from './components/Blog/Blog';
import Home from './components/Home';
import blogdetail from './components/Blog/BlogDetail';
import Login from './components/Member/Login';
import Account from './components/Account/Index';
import Cart from './components/Cart/Cart';
import wishlist from './components/Wishlist';

ReactDOM.render(
  <div>
    <Router>
      <App>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/login' component={Login}/>
          <Route path='/blog/list' component={Blog}/>
          <Route path='/blog/detail/:id' component={blogdetail}/>
          <Route path='/cart' component={Cart}/>
          <Route path='/wishlist' component={wishlist}/>
          <Route component = {Account}/>
        </Switch>
      </App>
    </Router>
  </div>,
  document.getElementById('root')
);

