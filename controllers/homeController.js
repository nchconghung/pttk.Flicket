exports.index = function(req,res,next){
    res.render('guest/home');
}
exports.pick = function(req,res,next){
    res.render('guest/flight_picking');
}
exports.info = function(req,res,next){
    res.render('guest/check_info');
}
exports.passenger = function(req,res,next){
    res.render('guest/passenger_info');
}
exports.payment = function(req,res,next){
    res.render('guest/payment');
}
exports.processing = function(req,res,next){
    res.render('guest/processing');
}
exports.signup = function(req,res,next){
    res.render('guest/sign_up');
}
exports.user = function(req,res,next){
    res.render('guest/user');
}
exports.ticket = function(req,res,next){
    res.render('guest/ticket');
}