module.exports = function (req, res) {
  var data = res.data || {};
  var code = res.code || 200;

  var result;
  if (!req) {
    res.send(404);
  } else {
    res.header('Content-Type', 'application/json');

    if (data.errors) {
      result = data;
    } else {
      // Drop down to models if data is a Bookshelf collection.
      // See: https://github.com/tgriesser/bookshelf/issues/333
      if(Array.isArray(data.models)) {
        data = data.models;
      }
      if(Array.isArray(data)) {
        result = data.map(function (item) {
          if (item.serialize) {
            return item.serialize();
          }
          return item;
        });
      } else {
        if (data.serialize) {
          result = data.serialize();
        } else {
          result = data;
        }
      }
    }

    res.status(code);
    res.json(result);
  }
};
