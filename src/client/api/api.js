/*
 * API for communicating with the server via socket.io
 * (both proactive and reactive)
 */

import io from 'socket.io-client';
import Settings from '../config/Settings';

class Api {

  constructor() {
    this.endpoint = Settings.api.endpoint;
    this.socket = io(Settings.api.socketUrl);
    this.id = this.socket.id;

    this.socket.on('connect', () => {
      console.log('Connected to socket.io server. Socket id: '+this.socket.id);
    });
  }

  emit(k, v) {
    this.socket.emit(k, v);
  }

};

export default Api;
