var express = require('express');
var router = express.Router();

// Shows a single post
router.get('/', function (req, res, next) {
  const data = req.params.email1;
  Post.findOne({ email: data }, (err, post) => {
   res.render('user-data', { userdat:post });
    console.log(userdat);
    //console.log(userdat);
  });
});

module.exports = router;