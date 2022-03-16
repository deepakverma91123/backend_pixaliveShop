const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cart')
const { isAuthenticated } = require('../middleware/Auth')


router.post('/addtocart',isAuthenticated,cartController.addCart)


module.exports = router
