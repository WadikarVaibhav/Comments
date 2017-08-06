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
        this.setState ({
          posts: response
        })
      }.bind(this)
    })
  }

  render() {
    var postList = this.state.posts.map(function (post) {
      return <li key= {post.pk}> {post.fields.post} </li>
    }, this)

    return (
      <div>
        {postList}

      </div>
    );
  }
}

ReactDOM.render(<Posts />, document.getElementById("container"));
