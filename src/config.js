const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env')})

const config = {
    app: {
        port: process.env.APP_PORT,
    }
}

module.exports = config