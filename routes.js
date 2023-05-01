module.exports = function(app) {
	const controller = require('./controller')
	const multer = require('multer')

	const upload = multer({
		dest: './uploads/'
	})

	// controller Routes
	app.post('/new-photo', upload.array('files'), controller.addFile)
}