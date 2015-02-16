'use strict';

var config = require('../config')
  , logger = require('../lib').logger
  , _      = require('lodash')
  , async  = require('async')
  , parser = require('blindparser')
  , moment = require('moment')
  , models = require('../models')
  ;

(function() {

  parser.parseURL(config.atomURL, function(err, data) {
    var comics = [];

    if (data && _.isArray(data.items)) {
      comics = data.items;
    }

    logger.info('Beginning Comics Import (%d found)', comics.length);

    async.each(comics, function(comic, done) {
      var href = _.isArray(comic.link) ? comic.link.join(' ') : comic.link,
          comicId = ('' + href).replace(/\D/g, '');

      var comicObj = {
        title: _.isArray(comic.title) ? comic.title.join(' ') : comic.title,
        postDate: moment(comic.date).format('YYYY-MM-DD hh:mm:ss'),
        href: href,
        comicId: comicId,
        src: 'http://www.questionablecontent.net/comics/' + comicId + '.png',
        description: comic.desc
      };

      new models.Comic(comicObj).save(function(err) {
        if (!err) {
          logger.info('%s comic saved', comicObj.comicId);
        }

        if (err && err.err && err.err.match('E11000 duplicate key error')) {
          // prevent duplicate error from terminating the script
          done();
        } else if (err && err.name === 'ValidationError') {
          logger.info(JSON.stringify(err));

          done();
        } else {
          done(err);
        }
      });
    }, function(err) {
      if (err) {
        logger.error(JSON.stringify(err));
      }

      logger.info('Comic Import Complete');
      process.exit();
    });
  });
})();
