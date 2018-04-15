import React from 'react';
import $ from 'jquery';
import Comments from './Comments.jsx';

export default class Comment extends React.Component {

  constructor() {
    super();
    this.state ={
      comments: [],
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
           this.setState ({
             comments: response
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

  render() {
    var comments = this.state.comments;

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


    return(

      <li key = {this.props.comment.pk}>
        {this.props.comment.fields.comment + ' ' + this.props.comment.fields.userFullName}
        <br/>

        <input type = "text" id={this.props.comment.pk} value={this.state.reply} onChange= {this.onChange.bind(this)} style={replyBoxStyle}/>

        <button onClick={this.replyComment.bind(this, this.props.comment.pk, this.props.postId, this.state.reply, this.props.username)} style={replyButtonStyle}>Reply</button>

        <a id={'commentsLink'+this.props.comment.pk} onClick={this.getComments.bind(this, this.props.comment.pk, this.props.postId)}
            style={commentLinkStyle}>Comments
        </a>

        <a id={'repliesLink'+this.props.comment.pk} onClick={this.expandReplyBox.bind(this, this.props.comment.pk)}
            style={replyLinkStyle}>Reply
        </a>

        <Comments CommentObject={comments} post= {this.props.postId}/>

      </li>
    )
  }
}
