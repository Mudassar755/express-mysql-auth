const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser')
const session = require('express-session');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const mailRouter = require('./routes/mail');

const authService = require('./services/auth')
const User = require("./models").user

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

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET'
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.unscoped().findOne({where: {id}}).then(user => {

    done(null, user);
  })
});

passport.use(new FacebookStrategy({
    clientID: process.env.APP_ID,
    clientSecret: process.env.APP_SECRET,
    callbackURL: process.env.callbackURL
  }, async (accessToken, refreshToken, profile, done) => {
    // console.log("access token: ", accessToken);
    //   console.log("refresh token: ", refreshToken);
    //   console.log("profile: ", profile);
      let user = await User.unscoped().findOne({ where: { facebookId: profile.id} });
      if(user){
        done(null, user);
      }else{
        new User({
          name:profile.displayName,
          email:profile._json.email,
          facebookId: profile.id
        })
        User.create({
          name:profile.displayName,
          email:profile._json.email,
          facebookId: profile.id
        })
        done(null, user);        

      }
    // return done(null, profile);
  }
));

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("profile", profile.id)
      let user = await User.unscoped().findOne({ where: { googleId: profile.id} });
      if(user){
        done(null, user);
      }else{
        new User({
          name:profile.displayName,
          email:profile._json.email,
          googleId: profile.id
        })
        User.create({
          name:profile.displayName,
          email:profile._json.email,
          googleId: profile.id
        })
        done(null, user);        

      }
    }
  )
);

app.use('/', indexRouter);
app.use('/auth', authRouter)
app.use('/mail', mailRouter)


app.use((err, req, res, next) => {
	if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  res.end(JSON.stringify(err))
})

module.exports = app;
