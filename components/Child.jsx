import React from 'react';

export default class ChildComments extends React.Component {

  showChildComments(parentId) {
    var parentId = parseInt(parentId);
    $.ajax({
      url: 'http://127.0.0.1:8000/childComments/',
      datatype: 'json',
      cache: false,
      data: {
        postId: postId,
      },
      error: function() {
        alert('Error!')
      },
      success: function(response) {
        this.setState ({
          parentComments: response
        })
      }.bind(this)
    })
  }

  render() {
    return(
      <ul id = {this.props.parentId}>
        <li>
          <a onClick={this.showChildComments.bind(this, this.props.parentId)}>Comments</a>
          <input type ="text" placeholder="Reply..."/>
          <button>Reply</button>
        </li>
      </ul>
    )
  }
}
