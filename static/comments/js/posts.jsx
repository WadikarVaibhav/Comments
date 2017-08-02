import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery'

class Posts extends React.Component {
  constructor() {
    super();
    this.state ={
      posts: [],
    }
  }

  componentDidMount() {
    this.loadPostsFromServer();
  }

  loadPostsFromServer() {
    $.ajax({
      url: 'http://127.0.0.1:8000/posts/',
      datatype: 'json',
      cache: false,
      error: function() {
        alert('Error!')
      },
      success: function(response) {
        console.log(response)
      }.bind(this)
    })
  }

  render(){
    return (
      <div>
        Hello
      </div>
    );
  }
}

ReactDOM.render(<Posts />, document.getElementById("container"));
