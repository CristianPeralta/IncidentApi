import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import mongodb from 'mongodb'
import session from 'express-session'
const MongoClient = mongodb.MongoClient;

const index = require('./routes/index');
const users = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
const dbc = {
  host: "127.0.0.1",
  port: 27017,
  name: "incidenciasapi"
}

MongoClient.connect("mongodb://"+dbc.host+":"+dbc.port+"/"+dbc.name, function(err, client) {
    if(err)
      throw err;
    console.log("Connected to the mongoDB ! -> mongodb://"+dbc.host+":"+dbc.port+"/"+dbc.name);
  });

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

app.use(session({
    // When there is nothing on the session, do not save it
    saveUninitialized: false,
    // Update session if it changes
    resave: true,
    // Set cookie
    cookie: {
        secure: false,
        maxAge: 365 * 24 * 60 * 60 * 1000
    },
    // Name of your cookie
    name: 'testCookie',
    // Secret of your cookie
    secret: 'thisIsSecret'
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
