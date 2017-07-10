import React from 'react';
import ReactDOM from 'react-dom';

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
      url: '/posts/',
      datatype: 'json',
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
