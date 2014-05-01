module.exports = function (req, res, next) {
  req.model.destroy().then(function () {
    res.data = req.model;
    res.code = 200;
    next();
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
