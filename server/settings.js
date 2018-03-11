'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
//settings
var env = process.env.NODE_ENV == 'production' ? 'prod' : 'dev';
var isDev = env == 'dev';
var settings = {
  env: env,
  port: isDev ? 4242 : process.env.PORT
};

exports.default = settings;