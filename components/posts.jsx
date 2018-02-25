import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery'

export default class Posts extends React.Component {
  constructor() {
    super();
    this.state ={
      posts: '',
    }
  }

  componentDidMount() {
    this.getAllPosts();
  }

  getAllPosts() {
    $.ajax({
      url: 'http://127.0.0.1:8000/posts/',
      datatype: 'json',
      cache: false,
      error: function() {
        alert('Error!')
      },
      success: function(response) {
         this.setState ({
           posts: 'Hello'
         })
      }.bind(this)
    })
  }


  render() {

    return (
      <div>
        {this.state.posts}
      </div>
    );
  }
}

ReactDOM.render(<Posts/>, document.getElementById("container"));
