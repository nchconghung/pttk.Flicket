var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var adminModel = require('../model/admin.model');
var session = require('express-session');

module.exports = function (app) {
    app.use(session({
        secret: 'h3o0c0h4i1m9i7n5h',
        resave: true,
        saveUninitialized: true
    }));
    console("vao passport");
    app.use(passport.initialize());
    
    var ls = new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password'
    }, (username, password, done) => {
        adminModel.singleByTaiKhoan(username).then(rows => {
          console.log("vai truy xuat");
        if (rows.length === 0) {
          return done(null, false, { message: 'Invalid Username.' });
        }
        
        var user = {
            user: rows[0],
            isAdmin: true
          };
        var ret = bcrypt.compareSync(password, rows[0].MatKhau);
        if (password == user.user.MatKhau) {
          return done(null, user);
        }
        return done(null, false, { message: 'Invalid Password' });
      }).catch(err => {
        return done(err, false);
      })
    });
  
    passport.use('admin',ls);
  
    passport.serializeUser((user, done) => {
      return done(null, user);
    });
  
    passport.deserializeUser((user, done) => {
      return done(null, user);
    });
  }