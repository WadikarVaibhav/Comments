import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { Link } from 'react-router-dom'

export default class Posts extends React.Component {
  constructor() {
    super();
    this.state ={
    posts: [],
    user:''
    }
  }

  componentDidMount() {
    console.log(this.props.location.state.user)
    this.getAllPosts(this.props.location.state.user);
  }

  getAllPosts(username) {
    $.ajax({
      url: 'http://127.0.0.1:8000/posts/',
      datatype: 'json',
      data: {
        user: username
      },
      cache: false,
      error: function() {
        alert('Error!')
      },
      success: function(response) {
        this.setState ({
         posts: JSON.parse(response.posts),
         user: response.user
        })
      }.bind(this)
    })
  }


render() {

  console.log(this.state.user);

  var postList = this.state.posts.map(function (post) {
    return <li key= {post.pk}><Link to={{ pathname: '/posts/'+post.pk, state: { id: post.pk, post: post.fields.post, user: this.props.location.state.user, profilePicture: this.state.user} }}> {post.fields.post} </Link></li>
  }, this)

  return (
    <div>
      {postList}
    </div>
  );
  }
}
