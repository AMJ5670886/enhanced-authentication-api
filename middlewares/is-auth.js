const jwt = require('jsonwebtoken');
module.exports = (req,res,next)=>{
    const token = req.get('Authorization');
    if(!token){
        const error = new Error('Not Authorized');
        error.statusCode = 401;
        throw error;
    }
    let decodedToken;
    try{
        decodedToken = jwt.verify(token,'somesupersecretcode');
    }catch(err){
        err.statusCode = 500;
        throw err;
    }
    req.userId = decodedToken.userId;
    req.userRole = decodedToken.userRole;
    next();
}