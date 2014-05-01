module.exports = function (method) {
  method = method||'create';
  return function (req, res, next) {
    req.Model[method](req.body).then(function (createdModel) {
      res.code = 201;
      res.data = createdModel;
      next();
    }).catch(function (e) {
      res.code = 422;
      res.data = {
        errors : [
          { message : e, status : "Unprocessable Entity" }
        ]
      };
      next();
    });
  };
};
