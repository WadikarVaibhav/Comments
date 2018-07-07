import React from 'react';
import $ from 'jquery';

export default class UserInfo extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div >
        <div id="div1">
        <img src={this.props.src} className="profile_photo_img" />
        </div>
        <div id="div2">
        <span className="user_name">{this.props.username}</span>
        <br/>
        <span className="comment_timestamp">{this.props.timestamp}</span>
        </div>
      </div>
    )
  }
}
