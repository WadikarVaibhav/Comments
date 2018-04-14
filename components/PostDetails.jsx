import React from 'react';
import $ from 'jquery';
import Comments from './Comments.jsx';

export default class PostDetails extends React.Component {

  constructor() {
    super();
    this.state ={
      parentComments: [],
      parentComment: '',
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

  onChange(e) {
    this.setState({
      parentComment: e.target.value
    })
  }

  postComment(parentId, postId, comment) {
    console.log('comment reply');
    $.ajax({
        url: 'http://127.0.0.1:8000/postComment/',
        datatype: 'json',
        type: 'POST',
        data: {
          postId: postId,
          parentId: parentId,
          comment: comment
        },
        cache: false,
        error: function() {
          alert('Error!')
        },
        success: function(response) {
            this.setState({
              parentComment: ''
            })
            this.getParentComments(parentId, postId);
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
        <br/>
        <input type ="text" value={this.state.parentComment} onChange= {this.onChange.bind(this)}/>
        <button onClick={this.postComment.bind(this, 0, postId, this.state.parentComment)} >Comment</button>
        <Comments CommentObject={parentComments} post= {postId}/>
      </div>
    );
  }
}
