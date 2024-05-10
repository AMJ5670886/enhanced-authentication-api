const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = (req,res,next)=>{
    const token = req.get('Authorization');
    if(!token){
        const error = new Error('Not Authorized');
        error.statusCode = 401;
        throw error;
    }
    let decodedToken;
    try{
        decodedToken = jwt.verify(token,config.SECRETCODE);
    }catch(err){
        err.statusCode = 500;
        throw err;
    }
    req.userId = decodedToken.userId; //user-id
    req.userRole = decodedToken.userRole; //user-role(admin or user)
    next();
}