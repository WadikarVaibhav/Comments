import React from 'react';
import SignUp from './SignUp.jsx';
import { browserRouter } from 'react-router';
import $ from 'jquery';

export default class Login extends React.Component {

  constructor() {
    super();
    this.state ={
      username: '',
      password: ''
    }
  }

  nagivateToSignUp() {
    this.props.history.push('/signUp');
  }

  validateUser() {
    $.ajax({
        url: 'http://127.0.0.1:8000/validateUser/',
        datatype: 'json',
        type: 'GET',
        data: {
          username: this.state.username,
          password: this.state.password,
        },
        cache: false,
        error: function() {
          alert('login failed')
        },
        success: function(response) {
           alert('Logged in successfully')
        }.bind(this)
      })
  }

  onChange(data, e) {
    var inputData = {};
    inputData[data] = e.target.value;
    this.setState(inputData);
  }

  render() {
    return (
      <div>
          <div id="login">
              <input type="username" value={this.state.username} onChange= {this.onChange.bind(this, 'username')} id="username" placeholder="Username"/>
              <br/>
              <input type="password" value={this.state.password} onChange= {this.onChange.bind(this, 'password')} id="password" placeholder="Password"/>
              <br/>
              <button id="loginButton" onClick={this.validateUser.bind(this)}>Login</button>
              <br/>
              <label>Not registered?</label>
              <a onClick={this.nagivateToSignUp.bind(this)} style={{cursor: 'pointer', color: "#0000FF", textDecoration: 'underline'}}>Create an account</a>
          </div>
      </div>
    )
  }
}
