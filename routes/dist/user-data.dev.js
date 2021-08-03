"use strict";

var express = require('express');

var router = express.Router();
console.log('tt hello'); // Shows a single post

router.get('/', function (req, res, next) {
  var data = req.params.email1;
  Post.findOne({
    email: data
  }, function (err, post) {
    res.render('user-data', {
      userdat: post
    });
    console.log(userdat); //console.log(userdat);
  });
});
module.exports = router;
//# sourceMappingURL=user-data.dev.js.map
