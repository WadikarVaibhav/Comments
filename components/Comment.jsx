import React from 'react';
import $ from 'jquery';
import Comments from './Comments.jsx';
import dateformat from 'dateformat';
import Menus from './Menus.jsx';
import Reply from './Reply.jsx';
import Edit from './Edit.jsx';
import DialogBox from './DialogBox.jsx';
import UserInfo from './UserInfo.jsx';

export default class Comment extends React.Component {

  constructor() {
    super();
    this.state = {
      comments: [],
      reply: '',
      edit: '',
      showLinks: true,
      showEdit: false,
      showMenu: false,
      showDelete: false
    }
    this.replyComment = this.replyComment.bind(this);
    this.closeReply = this.closeReply.bind(this);
    this.startReply = this.startReply.bind(this);
    this.closeEdit  = this.closeEdit.bind(this);
    this.startEdit = this.startEdit.bind(this);
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.clickEdit = this.clickEdit.bind(this);
    this.editComment = this.editComment.bind(this);
    this.startDelete = this.startDelete.bind(this);
    this.cancelDelete = this.cancelDelete.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
  }

  startDelete() {
    event.preventDefault();
    this.setState({
      showDelete: true,
      showMenu: false
    })
  }

  cancelDelete() {
    this.setState({
      showDelete: false
    })
  }

  closeEdit(event) {
    if (this.editMenu != null) {
      if (!this.editMenu.contains(event.target)) {
        this.setState({ showEdit: false }, () => {
          document.removeEventListener('click', this.closeEdit);
        });
      }
    }
  }

  startEdit(event) {
    event.preventDefault();
    this.setState({
      showEdit: true,
      showMenu: false
    }, () => {
      document.addEventListener('click', this.closeEdit);
    });
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

  clickEdit(e) {
    this.startEdit(e);
  }

  deleteComment(commentId, postId, user, parentId) {
    if (parentId == null) {
      parentId = 0;
    }
    $.ajax({
      url: 'http://127.0.0.1:8000/deleteComment/',
      datatype: 'json',
      type: 'POST',
      data: {
        postId: postId,
        commentId: commentId,
        username: user,
        parentId: parentId
      },
      cache: false,
      error: function() {
        alert('You are not allowed to delete!');
      },
      success: function(response) {
        this.setState({
        showDelete: false
        });
      }.bind(this)
    })
  }

  editComment(commentId, postId, edit, username, oldComment, parentId) {
    var that = this;
    if (parentId == null) {
      parentId = 0;
    }
    if (edit.length > 0) {
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
          alert('You are not allowed to edit!');
          that.setState({
            edit: '',
            showEdit: false
          })
        },
        success: function(response) {
          this.setState({
            edit: '',
            showEdit: false
          });
        }.bind(this)
      })
    } else {
      this.setState({
        edit: oldComment,
        showEdit: false
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

  showMenu(event) {
    event.preventDefault();

    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }

  closeMenu(event) {
    if(this.dropdownMenu != null) {
      if (!this.dropdownMenu.contains(event.target)) {

        this.setState({ showMenu: false }, () => {
          document.removeEventListener('click', this.closeMenu);
        });

      }
    }
  }

  render() {
    var comments = this.state.comments;

    return(
      <li  className="comment_list" key = {this.props.comment.pk}>

      <div>
      {
          this.state.showDelete
            ? (
              <DialogBox open={this.state.showDelete} onClose={this.cancelDelete} showCloseIcon={false} deleteComment = {this.deleteComment} cancelDelete={this.cancelDelete} commentId={this.props.comment.pk} postId={this.props.postId} user={this.props.username} parentid={this.props.comment.fields.parent_id}/>
            )
            : (
              null
            )
        }
      </div>

      <div>

      <UserInfo src={'http://127.0.0.1:8000/media/' +this.props.comment.fields.profile} username={this.props.comment.fields.userFullName}
      timestamp={this.getDate(this.props.comment.fields.date_modified)}/>

      </div>

      <div className="comment">

      {
        !this.state.showEdit
        ? (
          <div className="comment_text">
          <span >{this.props.comment.fields.comment}</span>
          </div>
        ) : (
          <div className="comment_reply_links" ref={(element) => {this.editMenu = element;}}>
          <Edit editComment = {this.editComment} commentId = {this.props.comment.pk} postId = {this.props.postId} edit = {this.props.comment.fields.comment} user = {this.props.username}  oldComment = {this.props.comment.fields.comment} parentId = {this.props.comment.fields.parent_id}/>
          </div>
        )
      }

      {
        !this.state.showLinks
        ? (
          <div id="reply" ref={(element) => {this.dropdownMenu = element;}}>
          <Reply replyComment={this.replyComment} commentId={this.props.comment.pk} postId={this.props.postId} reply={this.state.reply} user={this.props.username}/>
          </div>
        )
        : (
          <div className="comment_reply_links">
          <a onClick={this.getComments.bind(this, this.props.comment.pk, this.props.postId)}>Comments</a>
          <a onClick={this.clickReply.bind(this)}>Reply</a>
          <div className="menus_list">
          <button className="menus" onClick={this.showMenu}></button>
          {
            this.state.showMenu
            ? (
              <div className="menu" ref={(element) => {this.dropdownMenu = element;}}>
              <ul className="menu_unordered_list">
              <li onClick={this.startEdit} className="menus_list_item">
              Edit
              </li>
              <li onClick={this.startDelete} className="menus_list_item">
              Delete
              </li>
              </ul>
              </div>
            )
            : (
              null
            )
          }
          </div>
          </div>
        )
      }
      <Comments CommentObject={comments} post= {this.props.postId} user = {this.props.username}/>
      </div>
      </li>
    )
  }
}
