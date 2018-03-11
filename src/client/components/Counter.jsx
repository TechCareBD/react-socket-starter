import React from 'react';
import Settings from '../config/Settings';
import Api from '../api/api';

const Counter = React.createClass({

  getInitialState() {
    this.api = new Api;
    return {count: 1, numberOfClients: 1};
  },

  componentDidMount() {
    this.api.socket.on('updateCounter', (data) => {
      this.setState({count : data.c, numberOfClients: data.numberOfClients});
    });
  },

  render() {
    return (
      <div>
        <h3>Counter: {this.state.count}</h3>
        <p>Number of clients currently connected: {this.state.numberOfClients}</p>
      </div>
    )
  }

});

export default Counter;
