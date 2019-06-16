var hbs_sections = require('express-handlebars-sections');
var numeral = require('numeral');
function hbsHelpers(hbs, path) {
  return hbs.create({
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "../views/layouts"),
    partialsDir: path.join(__dirname, "../views/partials"),
    helpers: {
      format: val => {
        return numeral(val).format('0,0');
      },
      section: hbs_sections(),
      inc: function (value, options) {
        return parseInt(value) + 1;
      },
      math: function (lvalue, operator, rvalue, options) {
        lvalue = parseFloat(lvalue);
        rvalue = parseFloat(rvalue);
        return {
          "+": lvalue + rvalue,
          "-": lvalue - rvalue,
          "*": lvalue * rvalue,
          "/": lvalue / rvalue,
          "%": lvalue % rvalue
        }[operator];
      },
      gioHaCanh: function (num, list, options) {
        var date = new Date(list[num - 1].GioHaCanh);
        var h = date.getHours();
        var m = date.getMinutes();
        h = h < 10 ? '0' + h : h;
        m = m < 10 ? '0' + m : m;
        var mytime = h + ':' + m;
        return mytime;
      }
      , formatTime: function (time, options) {
        var date = new Date(time);
        var h = date.getHours();
        var m = date.getMinutes();
        h = h < 10 ? '0' + h : h;
        m = m < 10 ? '0' + m : m;
        var mytime = h + ':' + m;
        return mytime;
      },
      formatMonney: function (money, options) {
        return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      , diemHaCanh: function (num, list, options) {
        return list[num - 1].DiemDen;
      },
      thoiGianQuaCanh: function (list, options) {
        var length = list.length;
        if (length == 1)
          return 0;
        var rs = 0;
        for (var i = 1; i < length; i++) {
          rs += (new Date(list[i].GioCatCanh) - new Date(list[i - 1].GioHaCanh));
        }
        var milliseconds = parseInt((rs % 1000) / 100),
          seconds = Math.floor((rs / 1000) % 60),
          minutes = Math.floor((rs / (1000 * 60)) % 60),
          hours = Math.floor((rs / (1000 * 60 * 60)) % 24);
        rs = hours + minutes / 60;
        return rs;
      },
      tongGioBay: function (time, options) {
        var pieces = time.split(':');
        var hour = pieces[0];
        if (hour[0] == '0') {
          hour = hour.substr(1);
        }
        var min = pieces[1];
        if (min[0] == '0') {
          min = min.substr(1);
        }
        return hour + "h" + min + "m";
      },
      getGioBay: function (date, options) {
        var d = new Date(date);
        var h = date.getHours();
        var m = date.getMinutes();
        h = h < 10 ? '0' + h : h;
        m = m < 10 ? '0' + m : m;
        var mytime = h + ':' + m;
        return mytime;
      },
      getNgayBay: function (date, options) {
        var d = new Date(date);
        var day = d.getDate();
        var month = d.getMonth() + 1;
        var year = d.getFullYear();
        day = day < 10 ? '0' + day : day;
        month = month < 10 ? '0' + month : month;
        return day + "/" + month + "/" + year;
      },
      ifCond: function (v1, operator, v2, options) {
        switch (operator) {
          case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
          case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
          case '!=':
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
          case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
          case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
          case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
          case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
          case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
          case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
          case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
          default:
            return options.inverse(this);
        }
      },
      tgianQuaCanh: function (index, list, options) {
        var rs = new Date(list[index].GioCatCanh - list[index - 1].GioHaCanh);
        var milliseconds = parseInt((rs % 1000) / 100),
          seconds = Math.floor((rs / 1000) % 60),
          minutes = Math.floor((rs / (1000 * 60)) % 60),
          hours = Math.floor((rs / (1000 * 60 * 60)) % 24);
        rs = hours + "h" + minutes + "m";
        return rs;
      },
      sanBayHaCanh: function (num, list, options) {
        return list[num - 1].SanBayHaCanh;
      },
      hienThiTien: function (money, options) {
        return (
          money
            .toFixed(0)
            .replace('.', ',')
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + ' VND'
        )
      },
      tongTienHanhLy: function (adult, kid, baby, options) {
        var rs = 0;
        adult.forEach(function (a) {
          rs += parseInt(a);
        })
        kid.forEach(function (k) {
          rs += parseInt(k);
        })
        baby.forEach(function (b) {
          rs += parseInt(b);
        })
        return (
          rs
            .toFixed(0)
            .replace('.', ',')
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + ' VND'
        )
      },
      tongTienThanhToan: function(adultNum, adultPrice, kidNum, kidPrice, babyNum, babyPrice, adultLuggage, kidLuggage, babyLuggage, options){
        var rs = parseInt(adultNum)*parseInt(adultPrice)+parseInt(kidNum)*parseInt(kidPrice)+parseInt(babyNum)*parseInt(babyPrice);
        adultLuggage.forEach(function (a) {
          rs += parseInt(a);
        })
        kidLuggage.forEach(function (k) {
          rs += parseInt(k);
        })
        babyLuggage.forEach(function (b) {
          rs += parseInt(b);
        })
        return (
          rs
            .toFixed(0)
            .replace('.', ',')
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + ' VND'
        )
      }
    }
  });
}

module.exports = hbsHelpers;