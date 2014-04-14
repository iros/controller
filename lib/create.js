module.exports = function (method) {
  method = method||'create';
  return function (req, res, next) {
    req.Model[method](req.body).then(function (createdModel) {
      res.status(201);
      req.output = createdModel;
      next();
    }).catch(function (e) {
      res.setHeader('Content-Type', 'application/json');
      res.send({errors:e.toJSON()}, 422);
    });
  };
};
