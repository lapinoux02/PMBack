const fs = require('fs')
const admZip = require('adm-zip')
const conf = require('./conf.json')

const folder = conf.folder

exports.addFile = function(req, res) {
	req.files.forEach((file => {
		// Récupère le nom et l'extension (zip ou autre)
		let name = file.originalname.split('.').slice(0, -1).join('.')
		let extension = file.originalname.split('.').slice(-1)[0]

		// Gestion du fichier en fonction de son extension
		if (extension !== 'zip') {
			// Si on n'a pas un zip, on sauvegarde tel quel
			const filePath = `${folder}/${file.originalname}`
			fs.copyFileSync(`${file.path}`, filePath, fs.constants.COPYFILE_EXCL)
			fs.unlinkSync(`${file.path}`)
		} else {
			// Dans le cas d'un zip, on le dézip
			var zip = new admZip(`${file.path}`)
			zip.extractAllTo(`${folder}/`, false)

			// Supprime le zip
			fs.unlinkSync(`${file.path}`)
		}
	}))
	res.end('done')
}