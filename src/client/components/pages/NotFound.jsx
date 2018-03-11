import React, {Component} from 'react';

class NotFound extends Component {

  componentDidMount() {
    document.title = '404 Page Not Found :(';
  }

  render() {
    return (
      <div className="content notfound-content">
        <h3>404</h3>
        <p>page not found :(</p>
      </div>
    )
  }
};

export default NotFound;
