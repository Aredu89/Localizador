const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const app = express()
require('./API/model/db')

const apiRouter = require('./API/routes/index')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
//Las carpetas se hacen publicas
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'app_client')))

//Rutas
app.use('/api', apiRouter)
//Función para pasar el control de cualquier ruta a React
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'app_client', 'index.html'))
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
