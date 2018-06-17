import React from 'react';
import $ from 'jquery';
import Comments from './Comments.jsx';
import dateformat from 'dateformat';
import Menus from './Menus.jsx';
import Reply from './Reply.jsx';

export default class Comment extends React.Component {

  constructor() {
    super();
    this.state = {
      comments: [],
      commentLinkVisibility: 'visible',
      editBoxWidth: 0,
      editBoxVisibility: 'hidden',
      reply: '',
      edit: '',
      editButtonText: 'Edit',
      commentLabelVisibility: 'visible',
      showLinks: true
    }
    this.replyComment = this.replyComment.bind(this);
    this.closeReply = this.closeReply.bind(this);
    this.startReply = this.startReply.bind(this);
  }

  startReply(event) {
    event.preventDefault();
    this.setState({ showLinks: false }, () => {
      document.addEventListener('click', this.closeReply);
    });
  }


  closeReply(event) {
    if (!this.dropdownMenu.contains(event.target)) {
      this.setState({ showLinks: true }, () => {
        document.removeEventListener('click', this.closeReply);
      });
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

  clickReply(e) {
    this.startReply(e);
    this.setState({
      showLinks: false
    })
  }

  editComment(commentId, postId, edit, username, oldComment, parentId) {
    if (parentId == null) {
      parentId = 0;
    }
    if (this.state.editBoxVisibility == 'visible' && edit.length > 0) {
      $.ajax({
          url: 'http://127.0.0.1:8000/editComment/',
          datatype: 'json',
          type: 'POST',
          data: {
            postId: postId,
            commentId: commentId,
            edit: edit,
            username: username,
            oldComment: oldComment,
            parentId: parentId
          },
          cache: false,
          error: function() {
            alert('You are not allowed to edit!')
          },
          success: function(response) {
            this.setState({
              editButtonText: 'Edit',
              editBoxWidth: 0,
              editBoxVisibility: 'hidden',
              commentLabelVisibility: 'visible',
              edit: '',
            });
          }.bind(this)
        })
    } else {
      this.setState({
        editBoxWidth: 300,
        editBoxVisibility: 'visible',
        editButtonText: 'Done',
        edit: oldComment,
        commentLabelVisibility: 'hidden'
      })
    }
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
              reply: '',
              showLinks: true
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

  onChangeEdit(e) {
    this.setState ({
      edit: e.target.value
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

  render() {
    var comments = this.state.comments;

    const commentLinkStyle = {
      cursor: 'pointer',
      marginRight: '10px',
      visibility: this.state.commentLinkVisibility,
    }

    const editBoxStyle = {
      visibility: this.state.editBoxVisibility,
      width: this.state.editBoxWidth,
    }

    const commentLabelStyle = {
      visibility: this.state.commentLabelVisibility,
    }

    return(
      <li  className="comment_list" key = {this.props.comment.pk}>
        <div>
            <div id="div1">
              <img src={'http://127.0.0.1:8000/media/' +this.props.comment.fields.profile} className="profile_photo_img" />
            </div>
            <div id="div2">
              <span className="user_name">{this.props.comment.fields.userFullName}</span>
              <br/>
              <span className="comment_timestamp">{this.getDate(this.props.comment.fields.date_modified)}</span>
            </div>
        </div>

        <div className="comment">
          <div className="edit">
            <span style={commentLabelStyle}>{this.props.comment.fields.comment}</span>
            <div id="edit">
              <input className="comment_box" type = "text" id={this.props.comment.pk} value={this.state.edit} onChange= {this.onChangeEdit.bind(this)} style={editBoxStyle}/>
            {/*}<button className="comment_button" onClick={this.editComment.bind(this, this.props.comment.pk, this.props.postId, this.state.edit, this.props.username, this.props.comment.fields.comment, this.props.comment.fields.parent_id)} style={editButtonStyle}>{this.state.editButtonText}</button>*/}
            </div>
          </div>
          {
            !this.state.showLinks
              ? (
                <div id="reply" ref={(element) => {this.dropdownMenu = element;}}>
                  <Reply replyComment={this.replyComment} commentId={this.props.comment.pk} postId={this.props.postId} reply={this.state.reply} user={this.props.username}/>
                </div>
              )
              : (
                <div className="comment_reply_links">
                  <a onClick={this.getComments.bind(this, this.props.comment.pk, this.props.postId)} style={commentLinkStyle}>Comments</a>
                  <a onClick={this.clickReply.bind(this)}>Reply</a>
                  <Menus />
                </div>
              )
          }

          <Comments CommentObject={comments} post= {this.props.postId} user = {this.props.username}/>
        </div>
      </li>
    )
  }
}
