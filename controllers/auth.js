const User = require('../models/user');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.signup = async(req,res,next) => {
    const errors = validationResult(req);
    try{
    if(!errors.isEmpty()){
        const error = new Error('Validation Failed');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;
    const hashedPassword = await bcrypt.hash(password,12);
    if(role === "admin" ){
        const user = new User({
            username,
            email,
            password: hashedPassword,
            role: role
        });
        await user.save();
    }else{
        const user = new User({
            username,
            email,
            password: hashedPassword
        });
        await user.save();
    } 
    res.status(201).json({message:'User created'});
    }catch(err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.login = async(req,res,next) => {
    try{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error('Validation failed');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({email: email})
    if(!user){
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }
    const isEqual = await bcrypt.compare(password,user.password);
    if(!isEqual){
        const error = new Error('username/password incorrect');
        error.statusCode = 401;
        throw error;
    }
    const token = jwt.sign({
        email: user.email,
        userId: user._id.toString(),
        userRole: user.role
    },'somesupersecretcode',{
        expiresIn: '1h'
    })
    res.status(200).json({ message: 'logged in', token: token});
    }catch(err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
}
