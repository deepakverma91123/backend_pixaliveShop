const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cart')
const { isAuthenticated } = require('../middleware/Auth')


router.post('/addtocart/:id',isAuthenticated,cartController.addCart)

router.get('/getcart',isAuthenticated,cartController.getCart)

// router.put('/updatecart/:id',isAuthenticated,cartController.updateCart)

module.exports = router
