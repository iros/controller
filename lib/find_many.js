module.exports = function (opts) {
  opts = opts || {};
  return function (req, res, next) {
    var Model = req.Model;
    var account = req.account;
    var results;

    // if a model has an allowedFor method, we want to limit the
    // results to records the current account can see
    if (Model.allowedFor && account && !account.isAdmin()) {
      results = Model.allowedFor(account).then(function (ids) {
        return Model.collection().query(function () {
          this.whereIn('id', ids);
        }).fetch(opts);
      });
    } else {
      results = Model.collection().fetch(opts);
    }

    results.then(function (result) {
      req.output = result.models;
      next();
    }).catch(function (e) {
      next(e);
    });
  };
};
