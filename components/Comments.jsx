import React from 'react';
import Comment from './Comment.jsx';

export default class Comments extends React.Component {

  render() {
      console.log('print below');
      console.log(this.props)
       var commentsList = this.props.CommentObject.map(function (comment) {
         return <ul key = {comment.pk}><Comment comment={comment} postId = {this.props.post} username = {this.props.user} /></ul>
        }, this)
      return (
        <div>
          <ul>
              {commentsList}
          </ul>
        </div>
      );
    }
}
