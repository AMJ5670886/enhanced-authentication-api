const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');

const fileStorage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'images');
    },
    filename: (req,file,cb) => {
        cb(null,file.originalname + '-' + Date.now());
    }
})

const fileFilter = (req,file,cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
        cb(null,true);
    }else{
        cb(null,false);
    }
}

const app = express();

app.use(bodyParser.json());
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'));
app.use('/images',express.static(path.join(__dirname,'images')));

app.use('/api/user',authRoutes);
app.use('/api/profile',profileRoutes);

app.use((error,req,res,next)=>{
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({
        message: message,
        data: data
    })
})

mongoose.connect('mongodb+srv://ajoldmj:ajoldmj12@nodejsfull.nx874w1.mongodb.net/auth-api')
    .then((result)=>{
        app.listen(8080);
        console.log('connected');
    })
