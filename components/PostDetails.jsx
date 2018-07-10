import React from 'react';
import $ from 'jquery';
import Comments from './Comments.jsx';
import { Redirect } from 'react-router-dom'

export default class PostDetails extends React.Component {

  constructor() {
    super();
    this.state ={
      parentComments: [],
      parentComment: ''
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

  isUserLoggedIn(user) {
     if (user != undefined) {
       return true;
     }
     return false;
   }

   render() {
     var parentComments = this.state.parentComments;
     var postId = this.props.match.params.id;
     var state = this.props.location.state
     var isLoggedIn = this.isUserLoggedIn(state);
     var profilePicture = state.profilePicture;
     return (

           !isLoggedIn
           ? (
             <Redirect to="/login" />
             )
           : (
             <div>
               <br/>
               {this.props.location.state.post}
               <br/>
               <br/>
               <a onClick={this.getParentComments.bind(this, 0, postId)} style={{cursor: 'pointer', color: "#0000FF", textDecoration: 'underline'}}>comments</a>
               <br/>
               <br/>
               <div className="main">
                 <div >
                   <img src={'http://127.0.0.1:8000/media/' +profilePicture} className="profile_photo_img" />
                 </div>
                 <div className="img">
                   <input type ="text" value={this.state.parentComment} onChange= {this.onChange.bind(this)} placeholder="Add a comment..." className="comment_box"/>
                   <button onClick={this.postComment.bind(this, 0, postId, this.state.parentComment, this.props.location.state.user)} className="comment_button" >Comment</button>
                 </div>
                 <Comments CommentObject={parentComments} post= {postId} user={this.props.location.state.user} />
               </div>
             </div>
             )

     );
   }
 }
