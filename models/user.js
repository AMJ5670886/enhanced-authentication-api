const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minLength: 4
    },
    profile:{
        photo:{
            type: String,
        },
        name:{
            type: String,
        },
        bio:{
            type: String,
            maxLength:255
        },
        phoneNumber:{
            type: Number
        },
        profileVisibility:{
            type: String,
            enum:['public','private'],
            default: 'public'
        }
    },
    role:{
        type: String,
        enum:['user','admin'],
        default: 'user'
    }
});

module.exports = mongoose.model('User',userSchema);