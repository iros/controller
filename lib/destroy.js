module.exports = function (req, res, next) {
  req.model.destroy().then(function () {
    res.send(200);
  }).catch(function (e) {
    next(e);
  });
};
