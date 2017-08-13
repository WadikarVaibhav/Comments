import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';

export default class Posts extends React.Component {
  constructor() {
    super();
    this.state ={
      posts: [],
    }
  }

  componentDidMount() {
    this.loadPostsFromServer();
  }

  loadPostsFromServer() {
    $.ajax({
      url: 'http://127.0.0.1:8000/posts/',
      datatype: 'json',
      cache: false,
      error: function() {
        alert('Error!')
      },
      success: function(response) {
        this.setState ({
          posts: response
        })
      }.bind(this)
    })
  }


  render() {

    var postList = this.state.posts.map(function (post) {
      return <li key= {post.pk}><Link to={{ pathname: '/posts/'+post.pk, state: { id: post.pk, post: post.fields.post } }}> {post.fields.post} </Link></li>
    }, this)

    return (
      <div>
        {postList}
      </div>
    );
  }
}
