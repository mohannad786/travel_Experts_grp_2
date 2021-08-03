var express = require('express');
var router = express.Router();


/* GET home page and display greeting message */
router.get('/', function(req, res, next) {
  res.render('login') 
});



module.exports = router;
