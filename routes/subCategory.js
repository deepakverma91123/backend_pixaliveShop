const express = require('express')
const router = express.Router()

const subCategoryController = require('../controllers/subCategoryController')
const { isAuthenticated, authorizeRoles } = require('../middleware/Auth')

router.post('/subCategory',isAuthenticated,authorizeRoles('admin'), subCategoryController.addSubCategory)

// router.get('/getcategory', subCategoryController.getCategory)

// router.put('/category/:id',isAuthenticated, authorizeRoles('admin'), subCategoryController.updateCategory)

// router.delete("/deletecategories/:id",isAuthenticated, authorizeRoles('admin'), subCategoryController.deleteCategory)

// router.get('/category/:id', subCategoryController.getCategoryById)



module.exports = router;