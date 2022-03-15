const express = require('express')
const router = express.Router()
const wishlistController = require('../controllers/wishlistController')
const { isAuthenticated } = require('../middleware/Auth')
router.put('/wishlist/:id', wishlistController.newwishlist)

//get all products in homepage
router.get('/allwishlist',isAuthenticated, wishlistController.Getwishlist)

router.delete('/allwishlist/:id', wishlistController.deletewishlist)

module.exports = router
