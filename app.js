var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
<<<<<<< HEAD
var bodyParser = require('body-parser');
var exphbs = require("express-handlebars");
var hbs_sections = require('express-handlebars-sections');
var numeral = require('numeral');
=======
const exphbs = require("express-handlebars");
var bodyParser = require('body-parser');
var handlebars  = require('./helpers/handlebars.js')(exphbs,path);
>>>>>>> 237bb3d056e455249b0fcd0ad5fbc3042cdfe295

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
var lichsugiaodichAdminRouter = require('./routes/admin/lichsugiaodich.route')


var app = express();

// view engine setup
app.engine(
  "handlebars",
<<<<<<< HEAD
  exphbs({
  defaultLayout: "main",
  layoutsDir: path.join(__dirname, "views/layouts"),
  partialsDir: path.join(__dirname, "views/partials"),
  helpers: {
      format: val => {
      return numeral(val).format('0,0');
      },
      section: hbs_sections()
  }
  })
=======
  handlebars.engine
>>>>>>> 237bb3d056e455249b0fcd0ad5fbc3042cdfe295
);
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

app.use(require('./middlewares/auth-locals.mdw'));

app.use('/', indexRouter);
app.use('/guest',guestRouter);
app.use('/users', usersRouter);
app.use('/flight',flightRouter);

app.use('/admin',adminRouter);
app.use('/admin/member',thanhvienAdminRouter);
app.use('/admin/history',lichsugiaodichAdminRouter);
app.use('/admin/admin',adminAdminRouter);
app.use('/admin/customer',khachhangAdminRouter);
app.use('/admin/flight',chuyenbayAdminRouter);
app.use('/admin/airlines',hangHangKhongAdminRouter);

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
