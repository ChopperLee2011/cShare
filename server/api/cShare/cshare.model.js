'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var cShareSchema = new Schema({
  title: String,
  tags: [],
  content: String,
  create: String,
  time: Date,
  active: Boolean
});

module.exports = mongoose.model('cShare', cShareSchema);