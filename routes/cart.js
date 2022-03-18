const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cart')
const { isAuthenticated } = require('../middleware/Auth')


router.post('/addtocart', isAuthenticated, cartController.addCart)

router.get('/getcart', isAuthenticated, cartController.getCart)
router.delete('/deletecart', isAuthenticated, cartController.deletecart)


// router.put('/updatecart/:id',isAuthenticated,cartController.updateCart)

module.exports = router
