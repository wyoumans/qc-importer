'use strict';

var Schema = require('mongoose').Schema
    ;

var ComicSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  href: {
    type: String,
    required: true
  },
  src: {
    type: String,
    required: true
  },
  postDate: {
    type: Date,
    required: true
  },
  comicId: {
    type: Number,
    required: true,
    unique: true,
    index: true
  }
});

module.exports = ComicSchema;
