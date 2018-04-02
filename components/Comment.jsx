import React from 'react';
import $ from 'jquery';
import Comments from './Comments.jsx';

export default class Comment extends React.Component {

  constructor() {
    super();
    this.state ={
      comments: [],
    }
  }

  getComments(parentId, postId) {
    console.log('here in get comments '+parentId);
    console.log('p2 '+postId);
    $.ajax({
        url: 'http://127.0.0.1:8000/comments/',
        datatype: 'json',
        data: {
          postId: postId,
          parentId: parentId
        },
        cache: false,
        error: function() {
          alert('Error!')
        },
        success: function(response) {
           this.setState ({
             comments: response
           })
        }.bind(this)
      })
  }

  render() {
    console.log('child comments are : ');
    console.log(this.state.comments);

    var comments = this.state.comments;

    return(
      <li key = {this.props.comment.pk}>
        {this.props.comment.fields.comment}
        <br/>
        <a onClick={this.getComments.bind(this, this.props.comment.pk, this.props.postId)}
            style={{cursor: 'pointer', color: "#0000FF", textDecoration: 'underline'}}>comments
        </a>
        <Comments CommentObject={comments} post= {this.props.postId}/>
      </li>
    )
  }
}
