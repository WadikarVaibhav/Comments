import React from 'react';
import $ from 'jquery';

export default class PostDetails extends React.Component {

  constructor() {
  super();
  this.state ={
    parentComments: [],
  }
}

  getParentComments(parentId, postId) {
    console.log('p1 '+parentId);
    console.log('p2 '+postId);
    $.ajax({
        url: 'http://127.0.0.1:8000/parentComments/',
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

  render(){
    console.log(this.props)
    var id = this.props.match.params.id;
    return (
      <div>
        <br />
        {this.props.location.state.post}
        <br/>
        <a onClick={this.getParentComments.bind(this, 0, id)} style={{cursor: 'pointer', color: "#0000FF", textDecoration: 'underline'}}>comments</a>
      </div>
    );
  }
}
