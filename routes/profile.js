const express = require('express');
const profileController = require('../controllers/profile');
const User = require('../models/user');
const isAuth = require('../middlewares/is-auth');

const router = express.Router();

router.get('/',isAuth,profileController.getProfile);

router.patch('/editProfile',isAuth,profileController.editProfile);

router.put('/visibility',isAuth,profileController.setProfileVisibility);

router.get('/:name',isAuth,profileController.viewProfile);

module.exports = router;