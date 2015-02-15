'use strict';

var config = require('../config')
  , logger = require('../lib').logger
  , _      = require('lodash')
  , async  = require('async')
  , parser = require('blindparser')
  ;

(function() {

  parser.parseURL(config.atomURL, function(err, data) {
    var comics = [];

    if (data && _.isArray(data.items)) {
      comics = data.items;
    }

    logger.info('Beginning Comics Import (%d found)', comics.length);

    async.each(comics, function(comic, done) {
      var comicObj = {
        title: _.isArray(comic.title) ? comic.title.join(' ') : comic.title
      };

      console.log(comicObj);

      done(null);
    }, function(err) {
      if (err) {
        logger.error(err);
      }

      logger.info('Comic Import Complete');
      process.exit();
    });
  });
})();
