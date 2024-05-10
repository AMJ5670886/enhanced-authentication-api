const express = require('express');
const profileController = require('../controllers/profile');
const isAuth = require('../middlewares/is-auth');

const router = express.Router();

//GET: /api/profile/
router.get('/',isAuth,profileController.getProfile);

//PATCH: /api/profile/editProfile
router.patch('/editProfile',isAuth,profileController.editProfile);

//PUT: /api/profile/visibility
router.put('/visibility',isAuth,profileController.setProfileVisibility);

//GET: /api/profile/:name
router.get('/:name',isAuth,profileController.viewProfile);

module.exports = router;