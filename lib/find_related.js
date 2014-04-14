module.exports = function (relation, subRelations) {
  if (subRelations) {
    subRelations = {withRelated:subRelations};
  }
  return function (req, res, next) {
    req.model.related(relation).fetch(subRelations).then(function (result) {
      req.output = result.models;
      next();
    }).catch(function (e) {
      next(e);
    });
  };
};
