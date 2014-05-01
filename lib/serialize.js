module.exports = function (req, res) {
  var output = req.output;
  var result;
  if (!req) {
    res.send(404);
  } else {
    res.header('Content-Type', 'application/json');
    // Drop down to models if output is a Bookshelf collection.
    // See: https://github.com/tgriesser/bookshelf/issues/333
    if(Array.isArray(output.models)) {
      output = output.models;
    }
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
