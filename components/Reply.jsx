import React from 'react';
import $ from 'jquery';

export default class Reply extends React.Component {

  constructor() {
    super();
    this.state={
      reply: ''
    }
    this.onChange = this.onChange.bind(this);
    this.reply = this.reply.bind(this);
  }

  reply() {
    this.props.replyComment(this.props.commentId, this.props.postId, this.state.reply, this.props.user);
  }

  onChange(e) {
    this.setState({
      reply: e.target.value
    })
  }

  render() {
    return(
      <div className="reply_comment">
        <input className="comment_box" value={this.state.reply} onChange= {this.onChange}/>
        <button className="comment_button" onClick={this.reply}>Reply</button>
      </div>
    )
  }
}
