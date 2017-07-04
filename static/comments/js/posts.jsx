import React from 'react';
import ReactDOM from 'react-dom';

class Posts extends React.Component {
  constructor() {
    super();
  }
  render(){
    return (
      <div>
        Hello
      </div>
    );
  }
}

ReactDOM.render(<Posts />, document.getElementById("container"));
