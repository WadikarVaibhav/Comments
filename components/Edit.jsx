import React from 'react';
import $ from 'jquery';

export default class Edit extends React.Component {

  constructor() {
    super();
    this.state={
      edit: ''
    }
    this.onChange = this.onChange.bind(this);
    this.edit = this.edit.bind(this);
    this.closeEdit = this.closeEdit.bind(this);
  }

  edit() {
    this.props.editComment(this.props.commentId, this.props.postId, this.state.reply, this.props.user);
  }

  onChange(e) {
    this.setState({
      edit: e.target.value
    })
  }

  render() {
    return(
      <div className="reply_comment">
        <input className="comment_box" value={this.state.edit} onChange= {this.onChange}/>
        <button className="comment_button" onClick={this.reply}>Update</button>
      </div>
    )
  }
}
