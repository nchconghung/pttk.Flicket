var express = require('express');
var router = express.Router()
var guest_controller = require('../controllers/guestController');
var auth = require('../middlewares/auth');


router.get("/", guest_controller.index);
router.post("/",guest_controller.index_post)
router.get('/pick',guest_controller.pick);
router.post('/pick',guest_controller.pick_post);
router.get('/info',auth,guest_controller.info);
router.get('/passenger',guest_controller.passenger);
router.get('/payment',guest_controller.payment);
router.get('/processing',guest_controller.processing);
router.get('/signup',guest_controller.signup);
router.post('/signup',guest_controller.signup_post);
router.post('/signin',guest_controller.signin_post);
router.post('/signout',auth,guest_controller.signout_post);
router.get('/is-available-cmnd',guest_controller.availabe_cmnd);
router.get('/is-available-username',guest_controller.availabe_username);
router.get('/user',guest_controller.user);
router.get('/ticket',guest_controller.ticket);


module.exports = router;