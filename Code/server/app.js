const express = require('express')
const session = require('express-session')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const bodyParser = require('body-parser');
var methodOverride = require('method-override');
var errorHandler = require('errorhandler');

const apiRouter = require('./routes/api.js')
const fileRouter = require('./routes/upload.routes.js')
const modelRouter = require('./routes/upload-model.routes.js')


const app = express()

app.use(logger('dev'))
app.use(methodOverride());
app.use(session({ resave: true, saveUninitialized: true, 
                      secret: 'uwotm8' }));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(cookieParser())
// app.use(session({ secret: 'grehjznejzkhgjrez', saveUninitialized: false, resave: false }))
app.use(express.static(path.join(__dirname, '../client')))
app.use('/files', express.static(path.join(__dirname, 'files')));

app.use('/api/', apiRouter)
app.use('/apiFile/', fileRouter)
app.use('/apiModel/', modelRouter)

module.exports = app
