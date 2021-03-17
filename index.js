require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

// IMPORT ROUTES
const indexRouter = require('./routes/index.js');

// MONGO CONNECTION
const mongoDB = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.jrymf.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongo connection error'));

// APP SETUP
const app = express();
app.set('views', __dirname);
app.set('view engine', 'ejs');

// MIDDLEWARE
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

// ROUTES
app.use('/', indexRouter);

// LISTENER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});
