var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var challengesRouter = require('./routes/challenges');

var cors = require('cors');

var app = express();

const mongoose = require('mongoose');

function configure() {
  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  app.use('/', indexRouter);
  app.use('/challenges', challengesRouter);

  app.use(cors);

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
}

function connectToDB() {
  mongoose.connect("mongodb+srv://m001-student:m001-mongodb-basics@sandbox-f827c.mongodb.net/rounders?retryWrites=true&w=majority", { useNewUrlParser: true })
    .then(() => {
      console.log('Server connected');
      configure();
    })
    .catch((err) => {
      console.error('Server error:', err.stack);
      process.exit(1);
    });
}

connectToDB();

module.exports = app;
