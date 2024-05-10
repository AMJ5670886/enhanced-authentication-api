const User = require('../models/user');
const {deleteFile} = require('../utils/delete-file');

//view user's data
exports.getProfile = async(req,res,next) => {
    const id = req.userId;
    try{
        const user = await User.findById(id);
        if(!user){
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        const profile = user.profile;
        res.status(200).json({message:'Profile fetched.', profile: profile})
    }
    catch(err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
}

//edit user data
exports.editProfile = async(req,res,next) => {
    const name = req.body.name;
    const phoneNumber = req.body.phoneNumber;
    const bio = req.body.bio;
    const photo = 'images/' + req.file.filename;
    const id = req.userId;

    try{
        const user = await User.findById(id);
        if(!user){
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        if(name){user.profile.name = name}
        if(phoneNumber){user.profile.phoneNumber = phoneNumber}
        if(bio){user.profile.bio = bio}
        if(photo !== user.profile.photo){
            deleteFile(user.profile.photo);
            user.profile.photo = photo;
        }
        await user.save();
        res.status(201).json({message:'updated profile', user: user})
    }
    catch(err){
        if(!err.statusCode){
            err.statusCode = 500;
            deleteFile(photo);
        }
        next(err);
    }
}

//change privacy(private or public)
exports.setProfileVisibility = async(req,res,next) => {
    const id = req.userId;
    const visibility = req.body.visibility;
    try{
        const user = await User.findById(id);
        if(!user){
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        user.profile.profileVisibility = visibility;
        await user.save()
        res.status(201).json({message: 'updated visibility', user: user})
    }
    catch(err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
}

//to view other user's profile
exports.viewProfile = async(req,res,next) => {
    const name = req.params.name;
    try{
        const user = await User.findOne({username: name});
        if(!user){
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        if(user.profile.profileVisibility === 'private' && req.userRole !== 'admin'){
            return res.status(403).json({message:'Access denied'})
        }
        const profile = {
            name: user.profile.name,
            bio: user.profile.bio,
            phoneNumber: user.profile.phoneNumber,
            photo:user.profile.photo
        }
        res.status(200).json({username: user.username, email: user.email, profile: profile})
    }
    catch(err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
}