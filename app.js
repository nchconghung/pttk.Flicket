var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var exphbs = require("express-handlebars");

var bodyParser = require('body-parser');

var handlebars  = require('./helpers/handlebars.js')(exphbs,path);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var guestRouter = require('./routes/guest');
var flightRouter = require('./routes/flights');

var adminRouter = require('./routes/admin')
var adminAdminRouter = require('./routes/admin/admin.route')
var khachhangAdminRouter = require('./routes/admin/thongtinkhachhanggiaodich.route')
var thanhvienAdminRouter = require('./routes/admin/thanhvien.route')
var hangHangKhongAdminRouter = require('./routes/admin/hanghangkhong.route')
var chuyenbayAdminRouter = require('./routes/admin/chuyenbay.route')
var giaodichAdminRouter = require('./routes/admin/giaodich.route')
var adminAuth = require('./middlewares/auth-admin')

var app = express();

// view engine setup
app.engine(
  "handlebars",
  handlebars.engine
);

// app.engine(
//   "handlebars",
//   exphbs({
//     defaultLayout: "main",
//     layoutsDir: path.join(__dirname, "views/layouts"),
//     partialsDir: path.join(__dirname, "views/partials"),
//     helpers: {
//       format: val => {
//         return numeral(val).format('0,0');
//       },
//       section: hbs_sections()
//     }
//   })
// );

app.set("views", path.join(__dirname, "views/pages"));
app.set("view engine", "handlebars");


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

require('./middlewares/session')(app);
require('./middlewares/passport')(app);
require('./middlewares/passport-admin')(app);

app.use(require('./middlewares/auth-locals.mdw'));
// app.use(require('./middlewares/auth-admin'));

app.use('/', indexRouter);
app.use('/guest',guestRouter);
app.use('/users', usersRouter);
app.use('/flight',flightRouter);

app.use('/admin',adminRouter);
app.use('/admin/member',adminAuth,thanhvienAdminRouter);
app.use('/admin/deal',adminAuth,giaodichAdminRouter);
app.use('/admin/admin',adminAuth,adminAdminRouter);
app.use('/admin/customer',adminAuth,khachhangAdminRouter);
app.use('/admin/flight',adminAuth,chuyenbayAdminRouter);
app.use('/admin/airlines',adminAuth,hangHangKhongAdminRouter);

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
  //res.render('guest/error404');
  res.render('error');
});



module.exports = app;
