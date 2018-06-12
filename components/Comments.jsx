import React from 'react';
import Comment from './Comment.jsx';

export default class Comments extends React.Component {

  render() {
       var commentsList = this.props.CommentObject.map(function (comment) {
         return <ul className="comment_list" key = {comment.pk}><Comment comment={comment} postId = {this.props.post} username = {this.props.user} /></ul>
        }, this)
      return (
        <div>
              {commentsList}
        </div>
      );
    }
}
