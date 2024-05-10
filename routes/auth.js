const express = require('express');
const{ body } = require('express-validator');
const authController = require('../controllers/auth');
const User = require('../models/user');
const isAuth = require('../middlewares/is-auth');

const router = express.Router();

router.post('/signup',[
    body('username').trim().not().isEmpty(),
    body('password').trim().isLength({min: 4}),
    body('email').isEmail().withMessage('Please enter valid mail').custom((value,{req})=>{
        return User.findOne({email: value}).then(userDoc =>{
            if(userDoc){
                return Promise.reject('Email already exsists')
            }
        })
    }),
],authController.signup);

router.post('/login',[
    body('email').isEmail(),
    body('password').trim()
],authController.login);



module.exports = router;