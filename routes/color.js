const express = require('express')
const router = express.Router();
const ColorController = require('../controllers/colorController');
const { isAuthenticated, authorizeRoles } = require('../middleware/Auth');

router.post('/addcolor',isAuthenticated,authorizeRoles('admin'),ColorController.createColor);

router.get('/getallcolor',ColorController.getcolor)

router.get('/getcolorby/:id',ColorController.getcolorById)

module.exports = router