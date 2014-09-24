/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /cShares              ->  index
 * POST    /cShares              ->  create
 * GET     /cShares/:id          ->  show
 * PUT     /cShares/:id          ->  update
 * DELETE  /cShares/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var cShare = require('./cshare.model');

// Get list of cShares
exports.index = function(req, res) {
  cShare.find(function (err, cShare) {
    if(err) { return handleError(res, err); }
    return res.json(200, cShare);
  });
};

// Get a single cShare
exports.show = function(req, res) {
  cShare.findById(req.params.id, function (err, cShare) {
    if(err) { return handleError(res, err); }
    if(!cShare) { return res.send(404); }
    return res.json(cShare);
  });
};

// Creates a new cShare in the DB.
exports.create = function(req, res) {
  console.log(req.body);
  cShare.create(req.body, function(err, cShare) {
    if(err) { return handleError(res, err); }
    return res.json(201, cShare);
  });
};

// Updates an existing cShare in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  cShare.findById(req.params.id, function (err, cShare) {
    if (err) { return handleError(res, err); }
    if(!cShare) { return res.send(404); }
    var updated = _.merge(cShare, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, cShare);
    });
  });
};

// Deletes a cShare from the DB.
exports.destroy = function(req, res) {
  cShare.findById(req.params.id, function (err, cShare) {
    if(err) { return handleError(res, err); }
    if(!cShare) { return res.send(404); }
    cShare.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}