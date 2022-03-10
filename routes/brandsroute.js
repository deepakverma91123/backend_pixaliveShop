const express = require('express')
const { isAuthenticated, authorizeRoles } = require('../middleware/Auth')
const router = express.Router()
const BrandsController = require('../controllers/brandController')

router.post('/brandsdetails',isAuthenticated,authorizeRoles('admin','seller'),BrandsController.addBrands)

router.get('/branddetails',isAuthenticated,authorizeRoles('admin'),BrandsController.getAllBrands)

// console.log(authorizeRoles)
// neeed to check
router.put('/approve/:id',isAuthenticated,BrandsController.Approved)

router.delete('/deletebrands/:id',isAuthenticated,authorizeRoles('admin'),BrandsController.deleteBrand)


module.exports = router