'use strict';

var defaults = {
  "env": "development",
  "mongoConnectionString": "mongodb://localhost/qc",
  "logToFile": true,
  "serverEmail": "no-reply@williamyoumans.com",
  "adminEmail": process.env.ADMIN_EMAIL,
  "atomURL": "http://www.questionablecontent.net/QCRSS.xml",
  "parse": {
    "id": process.env.PARSE_APPLICATION_ID,
    "clientKey": process.env.PARSE_CLIENT_KEY,
    "jsKey": process.env.PARSE_JAVASCRIPT_KEY,
    "restKey": process.env.PARSE_REST_KEY,
    "masterKey": process.env.PARSE_MASTER_KEY
  },
  "sendgrid": {
    "user": process.env.SENDGRID_USER,
    "key": process.env.SENDGRID_KEY
  }
};

var confrodo = require('confrodo')
  , env      = __dirname + '/' + confrodo.env + '.json'
  , config   = confrodo(defaults, env, 'ENV', 'ARGV')
  ;

module.exports = config;
