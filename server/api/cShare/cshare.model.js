'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var cShareSchema = new Schema({
  title: String,
  content: String,
  create: String,
  time: Date
});

module.exports = mongoose.model('cShare', cShareSchema);