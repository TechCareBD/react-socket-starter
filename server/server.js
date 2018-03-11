'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressHistoryApiFallback = require('express-history-api-fallback');

var _expressHistoryApiFallback2 = _interopRequireDefault(_expressHistoryApiFallback);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _settings = require('./settings');

var _settings2 = _interopRequireDefault(_settings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//server config
var root = __dirname + '/../public';
var app = (0, _express2.default)();
var server = _http2.default.Server(app);
app.use(_express2.default.static(root));
app.use((0, _expressHistoryApiFallback2.default)('index.html', { root: root }));
var io = (0, _socket2.default)(server);

//socket.io
var numberOfClients = 0;
io.on('connection', function (socket) {
  numberOfClients++;
  console.log('New client connected: ' + socket.id);
  var c = 1;
  var inter = setInterval(function () {
    c++;
    socket.emit('updateCounter', {
      c: c,
      numberOfClients: numberOfClients
    });
    console.log(c);
  }, 1000);
  socket.on('disconnect', function () {
    clearInterval(inter);
    numberOfClients--;
  });
});

//start server
server.listen(_settings2.default.port);