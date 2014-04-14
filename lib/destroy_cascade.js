module.exports = function (req, res, next) {
  req.model.destroyCascade().then(function () {
    res.send(200);
  }).catch(function (e) {
    next(e);
  });
};
