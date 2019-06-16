var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var thanhvienModel = require('../model/thanhvien.model');

module.exports = function (app) {
  app.use(passport.initialize());
  app.use(passport.session());

  var ls = new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  }, (username, password, done) => {
    thanhvienModel.singleByTaiKhoan(username).then(rows => {
      if (rows.length === 0) {
        return done(null, false, { message: 'Tài khoản không tồn tại' });
      }

      var user = rows[0];
      var ret = bcrypt.compareSync(password, rows[0].MatKhau);
      if (ret) {
        return done(null, user);
      }

      return done(null, false, { message: 'Mật khẩu không đúng' });
    }).catch(err => {
      return done(err, false);
    })
  });

  passport.use(ls);

  passport.serializeUser((user, done) => {
    return done(null, user);
  });

  passport.deserializeUser((user, done) => {
    return done(null, user);
  });
}