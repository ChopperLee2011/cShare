/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var cShare = require('./cshare.model');

exports.register = function(socket) {
  cShare.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  cShare.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('cShare:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('cShare:remove', doc);
}