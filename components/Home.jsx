import PostDetails from './PostDetails.jsx';
import Posts from './Posts.jsx';
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, browserHistory, Switch } from 'react-router-dom';

class Home extends React.Component {
  render(){
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

ReactDOM.render(
    <Router history = {browserHistory}>
      <Home>
        <Route path = "/login" component = {Login}></Route>
        <Route path = "/signUp" component = {SignUp}></Route>
        <Route exact path = "/posts"  component = {Posts}></Route>
        <Route path = "/posts/:id" component = {PostDetails}></Route>
      </Home>
    </Router>, document.getElementById('container'))
