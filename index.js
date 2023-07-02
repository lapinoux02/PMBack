var express = require('express')
var app = express()
var port = 8007
var bodyParser = require('body-parser')
var routes = require('./routes')

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
	next()
})
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

routes(app)

app.listen(port)

console.log('Photoss server started on: ' + port)
