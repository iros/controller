module.exports = function (req, res) {
  var output = req.output;
  var result;
  if (!req) {
    res.send(404);
  } else {
    res.header('Content-Type', 'application/json');
    if(Array.isArray(output)) {
      result = output.map(function (item) {
        if (item.serialize) {
          return item.serialize();
        }
        return item;
      });
    } else {
      if (output.serialize) {
        result = output.serialize();
      } else {
        result = output;
      }
    }
    res.json(result);
  }
};
