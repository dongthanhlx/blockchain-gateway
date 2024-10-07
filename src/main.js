const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config')
const api = require('./api')

const app = express();
app.use(bodyParser.json());

app.post('/addresses', api.generateAddress)
app.post('/transactions', api.buildTransaction)

app.listen(config.app.port, () => console.log(`Listening on port ${config.app.port}`))