const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./config/config');

const fileStorage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'images');
    },
    filename: (req,file,cb) => {
        cb(null,file.originalname + '-' + Date.now());
    }
})

const app = express();

//middlewares
app.use(bodyParser.json());
app.use(multer({storage: fileStorage}).single('image'));
app.use('/images',express.static(path.join(__dirname,'images')));

//routes
app.use('/api/user',authRoutes);
app.use('/api/profile',profileRoutes);

//error handling
app.use((error,req,res,next)=>{
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({
        message: message,
        data: data
    })
})

//connection to db
mongoose.connect(config.MONGOURL)
.then((result)=>{
    app.listen(config.PORT,(result)=>{
        console.log(`Server: Starting server on port: ${config.PORT}`)
    });
})
.catch(err=>{
console.log('Server error');
})
