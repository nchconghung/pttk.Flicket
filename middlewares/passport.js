var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var thanhvienModel = require('../model/thanhvien.model');
var khachhangModel = require('../model/thongtinkhachhanggiaodich.model');
var thetindungModel = require('../model/thetindung.model');

module.exports = function (app) {
  app.use(passport.initialize());
  app.use(passport.session());

  var ls = new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  }, (username, password, done) => {
    thanhvienModel.singleByTaiKhoan(username).then(rows => {
      if (rows.length === 0) {
        return done(null, false, { message: 'Invalid Username' });
      }
      var ret = bcrypt.compareSync(password, rows[0].MatKhau);
      if (ret) {
        khachhangModel.singleForPP(rows[0].ThongTin).then(ttrows => {
          if (ttrows.length > 0){
            thetindungModel.single(ttrows[0].TheTinDung).then(ttdrows => {
              var user = {
                TaiKhoan: rows[0],
                ThongTin: ttrows[0],
                TheTinDung: ttdrows[0]};
              return done(null, user);
            }).catch(err => {
                return done(err, false);
            });
          }
        }).catch(err => {
          return done(err, false);
        });
      } else {
        return done(null, false, { message: 'Invalid Password' });
      }
    }).catch(err => {
      return done(err, false);
    });
  });

  passport.use(ls);

  passport.serializeUser((user, done) => {
    return done(null, user);
  });

  passport.deserializeUser((user, done) => {
    return done(null, user);
  });
}