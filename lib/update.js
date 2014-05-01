module.exports = function (req, res, next) {
  req.model.save(req.body, {patch:true}).then(function (updatedModel) {
    req.data = updatedModel;
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
