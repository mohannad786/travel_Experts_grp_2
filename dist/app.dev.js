"use strict";

var createError = require('http-errors');

var express = require('express');

var path = require('path');

var cookieParser = require('cookie-parser');

var logger = require('morgan');

var assert = require('assert'); //setup routing to webpages


var indexRouter = require('./routes/index');

var contactRouter = require('./routes/contact');

var galleryRouter = require('./routes/aboutus');

var signupRouter = require('./routes/signup'); //var booking1Router = require('./routes/booking1');
//var packagesRouter = require('./routes/packages');


var app = express(); // view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug'); // Mongoose connection
// const MONGO_URL = "mongodb+srv://mo:comon123@cluster0.c2uhk.mongodb.net/userdata?authSource=admin&replicaSet=atlas-rvxm88-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";
// const mongoose = require("mongoose");
// mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "DB connection error:"));
// db.once("open", function () {
//   console.log("We're connected!");
// });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express["static"](path.join(__dirname, 'public'))); // -------------------------------------------------------------
// For Passport.js

require("./my-passport").init(app); // -------------------------------------------------------------
//  Put the messages in the res.locals


app.use(function (req, res, next) {
  res.locals.message = req.session.msg; // Read the message from the session variable

  req.session.msg = null;
  next();
});
app.use('/', indexRouter);
app.use("/contact", contactRouter);
app.use("/signup", signupRouter); //app.use("/booking1", booking1Router);
//app.use("/packages", packagesRouter);

app.use('/user-error', function (req, res, next) {
  res.render('user-error');
}); // app.use('/', function(req, res, next) {
//   // res.render('de');
// });

app.use('/thankyou', function (req, res, next) {
  res.render('thankyou');
});
app.use('/aboutus', function (req, res, next) {
  res.render('aboutus');
}); // app.use('/log-out', function(req, res, next) {
//   res.render('logout');
// });
// catch 404 and forward to error handler

app.use(function (req, res, next) {
  next(createError(404));
}); // error handler

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // render the error page

  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
//# sourceMappingURL=app.dev.js.map
