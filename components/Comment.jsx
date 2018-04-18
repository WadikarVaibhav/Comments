import React from 'react';
import $ from 'jquery';
import Comments from './Comments.jsx';
import dateformat from 'dateformat';

export default class Comment extends React.Component {

  constructor() {
    super();
    this.state ={
      comments: [],
      users: [],
      replyBoxWidth: 0,
      replyBoxVisibility: 'hidden',
      replyButtonVisibility: 'hidden',
      replyButtonWidth: 0,
      commentLinkVisibility: 'visible',
      replyLinkVisibility: 'visible',
      reply: ''
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
          var commentResponse = response.comments;
          var comments = $.parseJSON('[' + commentResponse + ']');
          var userResponse = response.users;
          var users = $.parseJSON('[' + userResponse + ']');
           this.setState ({
             comments: comments[0],
             users: users[0]
           })
        }.bind(this)
      })
  }

  expandReplyBox(commentId) {
    this.setState({
      replyBoxWidth: 300,
      replyBoxVisibility: 'visible',
      replyButtonWidth: 60,
      replyButtonVisibility: 'visible',
      commentLinkVisibility: 'hidden',
      replyLinkVisibility: 'hidden',
    })
  }

  replyComment(parentId, postId, comment, user) {
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
              replyBoxVisibility: 'hidden',
              replyButtonVisibility: 'hidden',
              commentLinkVisibility: 'visible',
              replyLinkVisibility: 'visible',
              replyBoxWidth: 0,
              replyButtonWidth: 0,
              reply: ''
            })
            this.getComments(parentId, postId);
        }.bind(this)
      })
  }

  onChange(e) {
    this.setState({
      reply: e.target.value
    })
  }

  getUserName(userId) {
    var user;
    $.ajax({
        url: 'http://127.0.0.1:8000/getUserName/',
        datatype: 'json',
        type: 'GET',
        data: {
          userId: userId
        },
        cache: false,
        error: function() {
          alert('Error!')
        },
        success: function(response) {
          user = response;
        }.bind(this)
      })
      return user;
  }

  getDate(date) {
    return dateformat(date, "mmm d, yyyy h:MM TT");
  }

  getImage(userId) {
    console.log(this.props.usersInfo);
     // this.props.usersInfo.map(function(user) {
     //   if(user.pk == userId) {
     //     return {user.fields.picture}
     //   }
     // })

     for (var i = 0; i < this.props.usersInfo.length; i++) {
      if(this.props.usersInfo[i].pk == userId) {
        return this.props.usersInfo[i].fields.picture
      }
    }
  }

  render() {
    var comments = this.state.comments;
    var usersInfo = this.state.users;

    console.log("timings: ");

console.log(comments);

    const replyBoxStyle = {
      width: this.state.replyBoxWidth,
      visibility: this.state.replyBoxVisibility
    }

    const replyButtonStyle= {
      width: this.state.replyButtonWidth,
      visibility: this.state.replyButtonVisibility
    }

    const commentLinkStyle = {
      cursor: 'pointer',
      color: "#0000FF",
      textDecoration: 'underline',
      marginRight: '10px',
      visibility: this.state.commentLinkVisibility,
    }

    const replyLinkStyle = {
      cursor: 'pointer',
      color: "#0000FF",
      textDecoration: 'underline',
      visibility: this.state.replyLinkVisibility,
    }

    console.log("here: ")
    console.log(this);

    return(

      <li key = {this.props.comment.pk}>
        <img src={this.getImage(this.props.comment.fields.user_id)}  />
        {this.props.comment.fields.userFullName}
        <br/>
        {this.getDate(this.props.comment.fields.date_modified)}
        <br/>
        {this.props.comment.fields.comment}
        <br/>

        <input type = "text" id={this.props.comment.pk} value={this.state.reply} onChange= {this.onChange.bind(this)} style={replyBoxStyle}/>

        <button onClick={this.replyComment.bind(this, this.props.comment.pk, this.props.postId, this.state.reply, this.props.username)} style={replyButtonStyle}>Reply</button>

        <a id={'commentsLink'+this.props.comment.pk} onClick={this.getComments.bind(this, this.props.comment.pk, this.props.postId)}
            style={commentLinkStyle}>Comments
        </a>

        <a id={'repliesLink'+this.props.comment.pk} onClick={this.expandReplyBox.bind(this, this.props.comment.pk)}
            style={replyLinkStyle}>Reply
        </a>

        <Comments CommentObject={comments} post= {this.props.postId} user = {this.props.username} userInfo = {usersInfo}/>

      </li>
    )
  }
}
