const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect('mongodb+srv://black055:kindayne123@cluster0.avzqd.mongodb.net/class-api?retryWrites=true&w=majority', function (err) {
    if (err) throw err;
    console.log('Connect to database successful!');
  }, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
);

/*
mongoose.connect('mongodb://localhost:27017/class-api', function (err) {
    if (err) throw err;
    console.log('Connect to database successful!');
  }, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
);
*/

const usersRouter = require('./components/users/usersRoute');
const coursesRouter = require('./components/courses/coursesRoute');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

const whitelist = ['https://black055-classroom-app.netlify.app', 'http://localhost:3001']

app.use(cors({
    credentials: true,
    origin: whitelist
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/courses', coursesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
