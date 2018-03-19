import React from 'react';

export default class PostDetails extends React.Component {
  render(){
    console.log(this.props)
    var id = this.props.match.params.id;
    return (
      <div>
        <br />
        {this.props.location.state.post}
      </div>
    );
  }
}
