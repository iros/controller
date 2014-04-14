const _ = require('lodash');

exports.create = require('./lib/create');
exports.destroy = require('./lib/destroy');
exports.destroyCascade = require('./lib/destroy_cascade');
exports.findById = require('./lib/find_by_id');
exports.findMany = require('./lib/find_many');
exports.findRelated = require('./lib/find_related');
exports.serialize = require('./lib/serialize');
exports.update = require('./lib/update');

exports.extend = function (methods) {
  return _.extend({
    create: exports.create(),
    serialize: exports.serialize,
    update: exports.update,
    destroy: exports.destroy,
    destroyCascade: exports.destroyCascade,
    findById: exports.findById,
    findMany: exports.findMany
  }, methods);
};
