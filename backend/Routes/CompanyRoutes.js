const express = require('express');
const companyController = require('../Controllers/companyController');
const companyAuthMiddleware = require('../Middlewares/companyAuth');
const router = express.Router();

// Route for security registration
router.post('/securityRegister', companyController.securitySignUp);
// Route for company login
router.post('/companylogin', companyController.companyLogin);
// Route for fetching security list
router.get( '/securitylist/:companyName',companyAuthMiddleware,companyController.getSecurityList);
router.get('/companyheader',companyAuthMiddleware, companyController.companyHeader);
router.post('/createSlot',companyController.createSlot)
// router.get('/getSlots',companyController.getSlots)
router.put('/slots/:slotId',companyController.updateSlot)
router.delete('/deleteSlot/:slotId',companyController.deleteSlot)
router.get('/slots/:email',companyController.getCompanySlot)



module.exports = router;
