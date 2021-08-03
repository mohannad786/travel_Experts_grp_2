"use strict";

var express = require('express');

var router = express.Router(); // Generate random Greeting Program

var myarray = ['ready for some exciting time', 'how are you today', 'good to see you', 'hope you are having a good day'];
var greet = Math.floor(Math.random() * myarray.length);
var greetings = myarray[greet];
console.log(myarray[greet]);
/* GET home page and display greeting message */

router.get('/', function (req, res, next) {
  res.render('index', {
    greet_msg: 'Welcome to our travel Portal, ' + greetings,
    date_time: new Date().toString()
  });
});
module.exports = router;
//# sourceMappingURL=index.dev.js.map
