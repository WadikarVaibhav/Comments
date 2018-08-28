import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { Link, Redirect } from 'react-router-dom';

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

  isUserLoggedIn(user) {
    if (user != undefined) {
      return true;
    }
    return false;
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

    console.log(this.state.posts);
    var isLoggedIn = this.isUserLoggedIn(this.props.location.state);

    var postList = this.state.posts.map(function (post) {
      return <li key= {post.pk}><Link to={{ pathname: '/posts/'+post.pk, state: { id: post.pk, post: post.fields.post, user: this.props.location.state.user, profilePicture: this.state.user} }}> <img src = {'http://127.0.0.1:8000/media/'+post.fields.post} className="posts_photo_img"/></Link></li>
    }, this)

    return (
        <div>
         {
            !isLoggedIn
              ? (
                <Redirect to="/login" />
                )
              : (
                <div>
                  {postList}
                </div>
              )
          }
        </div>
    );
    }
  }
