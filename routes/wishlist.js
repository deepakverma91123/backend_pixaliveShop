const express = require('express')
const router = express.Router()
const wishlistController = require('../controllers/wishlistController')
router.put('/wishlist/:id', wishlistController.newwishlist)

//get all products in homepage
router.get('/allwishlist', wishlistController.Getwishlist)

router.delete('/allwishlist/:id', wishlistController.deletewishlist)

module.exports = router
