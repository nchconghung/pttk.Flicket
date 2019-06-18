var express = require('express');
var router = express.Router()
var guest_controller = require('../controllers/guestController');
var auth = require('../middlewares/auth');


router.get("/", guest_controller.index);
router.post("/",guest_controller.index_post);

router.get('/pick',guest_controller.pick);
router.post('/pick',guest_controller.pick_post);

router.get('/info',guest_controller.info);

router.get('/passenger',guest_controller.passenger);
router.post('/passenger',guest_controller.passenger_post);

router.get('/payment',guest_controller.payment);
router.post('/payment',guest_controller.payment_post);

router.get('/processing',guest_controller.processing);

router.get('/signup',guest_controller.signup);
router.post('/signup',guest_controller.signup_post);

router.get('/signin',guest_controller.signin);
router.post('/signin',guest_controller.signin_post);

router.get('/profile',guest_controller.profile);
router.post('/profile',guest_controller.profile_post);

router.post('/signout',auth,guest_controller.signout_post);
router.get('/is-available-username',guest_controller.availabe_username);

router.get('/user',auth,guest_controller.user);
router.post('/user',guest_controller.user_post);

router.get('/ticket',guest_controller.ticket);
router.post('/dtsignin',guest_controller.dtsignin);

module.exports = router;