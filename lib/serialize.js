module.exports = function (req, res) {
  var output = req.output;
  if (!req) {
    res.send(404);
  } else {
    res.header('Content-Type', 'application/json');
    if(Array.isArray(output)) {
      res.json(output.map(function (item) {
        return item.serialize();
      }));
    } else {
      res.json(output.serialize());
    }
  }
};
