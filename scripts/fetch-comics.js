'use strict';

var config  = require('../config')
  , logger  = require('../lib').logger
  , async  = require('async')
  , _       = require('lodash')
  ;

(function() {

  var comics = [];

  logger.info('Beginning Comics Import');

  async.each(comics, function(comic, done) {
    console.log(comic);
    done(null);
  }, function(err) {
    if (err) {
      logger.error(err);
    }

    logger.info('Comic Import Complete');
    process.exit();
  });
})();
