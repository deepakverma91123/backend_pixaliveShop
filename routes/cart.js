const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cart')


router.post('/addtocart/:id',cartController.AddCart)


module.exports = router
