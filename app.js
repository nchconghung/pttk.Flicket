var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const exphbs = require("express-handlebars");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var flightRouter = require('./routes/flights');
var adminRouter = require('./routes/admin');
var adminAdminRouter = require('./routes/admin/admin.route');
var khachhangAdminRouter = require('./routes/admin/thongtinkhachhanggiaodich.route');
var thanhvienAdminRouter = require('./routes/admin/thanhvien.route');
var chuyenbayAdminRouter = require('./routes/admin/chuyenbay.route');
// var hangHangKhongAdminRouter = require('./routes/admin/hanghangkhong.route');


var app = express();

// view engine setup
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views/layouts"),
    partialsDir: path.join(__dirname, "views/partials"),
  })
);
app.set("views", path.join(__dirname, "views/pages"));
app.set("view engine", "handlebars");


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/flight',flightRouter);
app.use('/admin',adminRouter);
app.use('/admin/thanhvien',thanhvienAdminRouter);
app.use('/admin/admin',adminAdminRouter);
app.use('/admin/khachhang',khachhangAdminRouter);
app.use('/admin/chuyenbay',chuyenbayAdminRouter);
// app.use('/admin/hanghangkhong',hangHangKhongAdminRouter);

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
  //res.render('error');
});

module.exports = app;
