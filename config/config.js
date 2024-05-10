require("dotenv").config();

const config = {
    PORT: process.env['ENV']  || 8080,
    SECRETCODE: process.env['SECRETCODE'],
    MONGOURL: process.env['MONGOURL']
}

module.exports = config;