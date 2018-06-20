import React from 'react';
import $ from 'jquery';
import Comments from './Comments.jsx';
import dateformat from 'dateformat';
import Menus from './Menus.jsx';
import Reply from './Reply.jsx';
import Edit from './Edit.jsx';
import Modal from 'react-responsive-modal';

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
    this.startComment = this.startComment.bind(this);
    this.closeDelete = this.closeDelete.bind(this);
    this.startDelete = this.startDelete.bind(this);
  }

  startDelete() {
    event.preventDefault();
    this.setState({
      showDelete: true,
      showMenu: false
    })
    if (this.state.showDelete) {
      return
      <div>
       <Modal open={open} onClose={this.closeDelete} center>
         <h2>Simple centered modal</h2>
       </Modal>
     </div>
    }
  }

  closeDelete() {
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

  startComment(commentId, postId, user, parentId) {
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
          showMenu: false
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

    const dialogStyles = {
      fontFamily: "sans-serif",
      textAlign: "center",
      width: 100,
    };

    return(
      <li  className="comment_list" key = {this.props.comment.pk}>

      <div>
      {
          this.state.showDelete
            ? (
              <div>
                <Modal open={this.state.showDelete} onClose={this.closeDelete} showCloseIcon={false} center>
                  <div id="modal_main">
                        <div className="modal_header">
                          <div className="modal_title" id="__w2_lrvWDrU_modal_title">Delete Comment</div>
                        </div>

                        <div className="modal_content" id="__w2_lrvWDrU_content">Are you sure you want to delete this comment?</div>

                        <div className="modal_footer" id="__w2_lrvWDrU_modal_footer">
                            <span className="text_links">
                              <a className="modal_cancel_link">Cancel</a>
                            </span>
                              <button className="submit_button">Confirm</button>
                        </div>
                  </div>
                </Modal>
              </div>
            )
            : (
              null
            )
        }
      </div>

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

      {
        !this.state.showEdit
        ? (
          <div className="comment_text">
          <span style={commentLabelStyle}>{this.props.comment.fields.comment}</span>
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
          <a onClick={this.getComments.bind(this, this.props.comment.pk, this.props.postId)} style={commentLinkStyle}>Comments</a>
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
