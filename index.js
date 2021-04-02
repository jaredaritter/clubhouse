// ---------------------------------------
// ** MODULES **
// ---------------------------------------
require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// ---------------------------------------
// ** IMPORT ROUTES **
// ---------------------------------------
const indexRouter = require('./routes/index.js');

// ---------------------------------------
// ** IMPORT MODELS **
// ---------------------------------------
const User = require('./models/User');

// ---------------------------------------
// ** MONGO CONNECTION **
// ---------------------------------------
const mongoDB = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.jrymf.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongo connection error'));

// ---------------------------------------
// ** APP SETUP **
// ---------------------------------------
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// ---------------------------------------
// ** PASSPORT SETUP **
// ---------------------------------------
passport.use(
  new LocalStrategy(function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Incorrect password' });
        }
      });
    });
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

// ---------------------------------------
// ** MIDDLEWARE **
// ---------------------------------------
app.use(
  session({
    secret: 'Penny is the best',
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
// app.use(function(req, res, next) {
//   res.locals.currentUser = req.user;
//   next();
// });

// ---------------------------------------
// ** ROUTES **
// ---------------------------------------
app.use('/', indexRouter);

// ---------------------------------------
// ** LISTENER **
// ---------------------------------------
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});
