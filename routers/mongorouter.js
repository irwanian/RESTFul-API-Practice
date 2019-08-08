var express = require('express')
var router = express.Router()

const {moviesController} = require('../controllers')

router.get('/movies', moviesController.getMovies)
router.post('/movies', moviesController.addMovies)
router.put('/movies/:id', moviesController.deleteMovie)
router.delete('/movies/:id', moviesController.editMovie)

module.exports = router