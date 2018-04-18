import React from 'react';
import $ from 'jquery';
import Comments from './Comments.jsx';

export default class PostDetails extends React.Component {

  constructor() {
    super();
    this.state ={
      parentComments: [],
      parentComment: '',
      users: []
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
          var commentResponse = response.comments;
          var comments = $.parseJSON('[' + commentResponse + ']');
          var userResponse = response.users;
          var users = $.parseJSON('[' + userResponse + ']');
           this.setState ({
             parentComments: comments[0],
             users: users[0]
           })
        }.bind(this)
      })
  }

  onChange(e) {
    this.setState({
      parentComment: e.target.value
    })
  }

  postComment(parentId, postId, comment, user) {
    console.log('comment reply');
    $.ajax({
        url: 'http://127.0.0.1:8000/postComment/',
        datatype: 'json',
        type: 'POST',
        data: {
          postId: postId,
          parentId: parentId,
          comment: comment,
          user: user
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
    var parentComments = this.state.parentComments;
    var usersInfo = this.state.users;
    var postId = this.props.match.params.id;
    return (
      <div>
        <br />
        {this.props.location.state.post}
        <br/>
        <a onClick={this.getParentComments.bind(this, 0, postId)} style={{cursor: 'pointer', color: "#0000FF", textDecoration: 'underline'}}>comments</a>
        <br/>
        <input type ="text" value={this.state.parentComment} onChange= {this.onChange.bind(this)}/>
        <button onClick={this.postComment.bind(this, 0, postId, this.state.parentComment, this.props.location.state.user)} >Comment</button>
        <Comments CommentObject={parentComments} post= {postId} user={this.props.location.state.user} usersInfo={usersInfo}/>
      </div>
    );
  }
}
