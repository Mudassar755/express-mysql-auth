const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser')

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');

const authService = require('./services/auth')

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
  //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5000');
     // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', '*');
    next()
})
app.use(bodyParser.json({
    limit: '100mb'    
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('uploads'))

app.use(authService.authRequest)

app.use('/', indexRouter);
app.use('/auth', authRouter)


app.use((err, req, res, next) => {
	if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  res.end(JSON.stringify(err))
})

module.exports = app;
