var express = require('express');
var router = express.Router();

var home_controller = require('../controllers/homeController');

//HOME
router.get('/',home_controller.index);
router.get('/pick',home_controller.pick);
router.get('/info',home_controller.info);
router.get('/passenger',home_controller.passenger);
router.get('/payment',home_controller.payment);
router.get('/processing',home_controller.processing);
router.get('/signup',home_controller.signup);
router.get('/user',home_controller.user);
router.get('/ticket',home_controller.ticket);

module.exports = router;