import express from 'express'
import path from 'path'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import session from 'express-session'
import cors from 'cors'
import initializeDatabases from './db'

const app = express();
const index = require('./routes/index');
const users = require('./routes/users');
const dependences = require('./routes/dependences');
const incidents = require('./routes/incidents');

initializeDatabases().then(dbs => {
  console.log('We are connented to DB');
}).catch(err => {
  console.error('Failed to make all database connections!')
  console.error(err)
  process.exit(1)
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


app.use(cors({origin:true,credentials: true}));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', index);
app.use('/api/v1/users', users);
app.use('/api/v1/dependences', dependences);
app.use('/api/v1/incidents', incidents);

let clients = []

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
