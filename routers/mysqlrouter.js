var express = require('express')
var router = express.Router()

const {categoriesController} = require('../controllers')

router.get('/categories', categoriesController.getCategories)
router.post('/categories', categoriesController.addCategories)
router.put('/categories/:id', categoriesController.deleteCategories)
router.delete('/categories/:id', categoriesController.editCategories)

module.exports = router