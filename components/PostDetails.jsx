import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import Child from './Child.jsx';

export default class PostDetails extends React.Component {

  constructor() {
    super();
    this.state ={
      parentComments: []
    }
  }

  showParentComments(postId) {
    var postId = parseInt(postId);
    $.ajax({
      url: 'http://127.0.0.1:8000/parentComments/',
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
    var parentCommentsList = this.state.parentComments.map(function (comment) {
      return (
        <div>
            <li key= {comment.pk}> {comment.fields.comment} </li>
            <Child parentId={comment.pk} />
        </div>
      )
    }, this)

    var post = this.props.location.state.post;
    var id = this.props.match.params.id;
    return (
      <div>
        <br />
          {post}
        <ul>
          <li onClick={this.showParentComments.bind(this, id)}>Comments</li>
        </ul>
        <div>
          {parentCommentsList}
        </div>
      </div>
    );
  }
}
