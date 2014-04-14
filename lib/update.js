module.exports = function (req, res, next) {
  req.model.save(req.body, {patch:true}).then(function (updatedModel) {
    res.status(200);
    req.output = updatedModel;
    next();
  }).catch(function (e) {
    res.setHeader('Content-Type', 'application/json');
    res.send({errors:e.toJSON()}, 422);
  });
};
