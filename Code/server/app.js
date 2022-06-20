const express = require('express')
const session = require('express-session')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const apiRouter = require('./routes/api.js')
const fileRouter = require('./routes/upload.routes.js')


const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(session({ secret: 'grehjznejzkhgjrez', saveUninitialized: false, resave: false }))
app.use(express.static(path.join(__dirname, '../client')))
app.use('/files', express.static(path.join(__dirname, 'files')));

app.use('/api/', apiRouter)
app.use('/apiFile/', fileRouter)

module.exports = app
