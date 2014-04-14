var Promise = require('when');

module.exports = function (opts) {
  opts = opts || {};
  return function (req, res, next) {
    var Model = req.Model;
    var account = req.account;
    var id = parseInt(req.params.id);
    var preflight;

    // bail on non numeric ids or models that require security
    // when there is no account logged in
    if(isNaN(id) || (Model.allowedFor && !account)) {
      res.send(404);
      return;
    }

    // if model has an allowedFor method and the current account
    // is not an administrator, validate that we can view it
    if (Model.allowedFor && !account.isAdmin()) {
      preflight = Model.allowedFor(account, id);
    } else {
      // otherwise just fake that we can
      preflight = Promise.defer().resolve([id]);
    }

    preflight.then(function (allowed) {
      if(!allowed.length) {
        res.send(404);
        return;
      }
      return Model.byId(id, opts).then(function (result) {
        if (result === null) {
          res.send(404);
          return;
        }
        req.model = result;
        req.output = result;
        next();
      });
    }).catch(function (e) {
      next(e);
    });
  };
};
