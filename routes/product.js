const express = require('express')
const router = express.Router()
const productController = require('../controllers/ProductController')
const { isAuthenticated, authorizeRoles } = require('../middleware/Auth')
// const authenticated = require('../middleware/authenticated')
// const auth = require('../middleware/authenticated')
router.post('/product/new',  isAuthenticated,authorizeRoles('admin','seller'),productController.newproduct)

//get all products in homepage
router.get('/products',productController.Getproduct)

router.get('/products/search/:name',productController.search)

router.get('/getproductcategory/:id', productController.getListByCategory)
// 
router.get('/admin/products', isAuthenticated,authorizeRoles('admin','seller'), productController.Getproduct)

router.get('/admin/search/:name', isAuthenticated,authorizeRoles('admin','seller'), productController.search)

router.put('/admin/update/:id', isAuthenticated,authorizeRoles('admin','seller'), productController.updateProducts)

router.delete('/admin/delete/:id', isAuthenticated,authorizeRoles('admin','seller'), productController.deleteProducts)

module.exports = router
