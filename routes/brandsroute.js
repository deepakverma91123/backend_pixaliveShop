const express = require('express')
const { isAuthenticated, authorizeRoles } = require('../middleware/Auth')
const router = express.Router()
const BrandsController = require('../controllers/brandController')

router.post('/brandsdetails',isAuthenticated,BrandsController.addBrands)

router.get('/branddetails',BrandsController.getAllBrands)

// console.log(authorizeRoles)
// neeed to check
router.put('/approve/:id',BrandsController.Approved)

router.delete('/deletebrands/:id',BrandsController.deleteBrand)


module.exports = router