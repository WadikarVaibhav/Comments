import React from 'react';
import $ from 'jquery';
import Comments from './Comments.jsx';

export default class PostDetails extends React.Component {

  constructor() {
    super();
    this.state ={
      parentComments: [],
    }
  }

  getParentComments(parentId, postId) {
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
             parentComments: response
           })
        }.bind(this)
      })
  }

  render() {
    console.log(this.props);
    var parentComments = this.state.parentComments;
    var postId = this.props.match.params.id;
    return (
      <div>
        <br />
        {this.props.location.state.post}
        <br/>
        <a onClick={this.getParentComments.bind(this, 0, postId)} style={{cursor: 'pointer', color: "#0000FF", textDecoration: 'underline'}}>comments</a>
        <Comments CommentObject={parentComments} post= {postId}/>
      </div>
    );
  }
}
