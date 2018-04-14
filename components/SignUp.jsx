import React from 'react';
import $ from 'jquery';

export default class SignUp extends React.Component {

  constructor() {
    super();
    this.state={
      firstname: '',
      lastname: '',
      email: '',
      username: '',
      password: ''
    }
  }

  isFormValid() {
    if(this.state.firstname == '') {
      return false;
    }
    if(this.state.lastname == '') {
      return false;
    }
    if(this.state.email == '') {
      return false;
    }
    if(this.state.username == '') {
      return false;
    }
    if(this.state.password == '') {
      return false;
    }
    return true;
  }

  signUpUser() {
    if(this.isFormValid()) {
      $.ajax({
          url: 'http://127.0.0.1:8000/addUser/',
          datatype: 'json',
          type: 'POST',
          data: {
            username: this.state.username,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            password: this.state.password,
            email: this.state.email
          },
          cache: false,
          error: function() {
            alert('Error!')
          },
          success: function(response) {
             alert('account successfully created')
          }.bind(this)
        })
    } else {
      alert('All the fields are mandatory');
    }
  }

  onChange(data, e) {
    var inputData = {};
    inputData[data] = e.target.value;
    this.setState(inputData);
  }

  render() {
    return (
      <div>
          <div id="signup">
              <input type="text" id="firstname" value={this.state.firstname} onChange= {this.onChange.bind(this, 'firstname')} placeholder="First Name"/>
              <br/>
              <input type="text" id="lastname" value={this.state.lastname} onChange= {this.onChange.bind(this, 'lastname')} placeholder="Last Name"/>
              <br/>
              <input type="text" id="email" value={this.state.email} onChange= {this.onChange.bind(this, 'email')} placeholder="Email"/>
              <br/>
              <input type="text" id="username" value={this.state.username} onChange= {this.onChange.bind(this, 'username')} placeholder="Username"/>
              <br/>
              <input type="password" id="password" value={this.state.password} onChange= {this.onChange.bind(this, 'password')} placeholder="Password"/>
              <br/>
              <button id="signupButton" onClick={this.signUpUser.bind(this)}>Create an account</button>
          </div>
      </div>
    )
  }
}
