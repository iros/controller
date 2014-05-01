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
    if(isNaN(id)) {
      res.data = { errors : [
        { message: "Non numeric id", status : "Not Acceptable" }
      ]};
      res.code = 406;
      next();
    } else if (Model.allowedFor && !account) {
      res.data = { errors : [
        { message : "Not authorized", status: "Unauthorized" }
      ]};
      res.code = 401;
      next();
    }


    // if model has an allowedFor method and the current account
    // is not an administrator, validate that we can view it
    if (Model.allowedFor && !account.isAdmin()) {
      preflight = Model.allowedFor(account, id);
    } else {
      // otherwise just fake that we can
      preflight = Promise.defer();
      preflight.resolve([id]);
      preflight = preflight.promise;
    }

    preflight.then(function (allowed) {
      if(!allowed.length) {
        res.code = 401;
        res.data = { errors : [
          { message : "Not authorized", status : "Unauthorized" }
        ]};
        next();
      }
      return Model.byId(id, opts).then(function (result) {
        if (result === null) {
          res.code = 404;
          res.data = { errors : [
            { message : "Model not found", status : "Not Found" }
          ]};
          next();
        }
        req.model = result;
        res.data = result;
        next();
      });
    }).catch(function (e) {
      res.code = 400;
      res.data = {
        errors : [
          { message : e, status : "Bad Request" }
        ]
      };
      next();
    });
  };
};
