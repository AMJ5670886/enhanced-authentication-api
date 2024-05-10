const fs = require('fs');
const path = require('path');

//delete unused images
exports.deleteFile = (imageUrl) =>{
    let filePath = path.join(__dirname,'../',imageUrl);
    fs.unlink(filePath,err =>{
        if(err){
            console.log(err);
        }
    })
}