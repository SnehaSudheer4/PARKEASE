const express = require('express');
const adminController = require('../Controllers/adminController');
const adminAuthMiddleware = require('../Middlewares/adminAuth');
const router = express.Router();

// Route for admin login
router.post('/adminlogin',adminController.adminLogin);
// Route for fetching user list
router.get('/userlist',adminAuthMiddleware,adminController.getAdminUserList);
// Routes for blocking and unblocking users
router.put('/block/:userId' ,adminController.blockUser);
router.put('/unblock/:userId', adminController.unblockUser);
router.put('/block/:companyId',adminController.blockCompany);
router.put('/unblock/:companyId',adminController.unblockCompany)
// Route for company registration
router.post('/companyRegister',adminController.companySignUp);
// Route for fetching company list
router.get('/companylist', adminController.getAdminCompanyList);
router.get('/adminheader',adminAuthMiddleware,adminController.adminHeader)
// Routes for blocking and unblocking companies
router.put('/block/:companyId', adminController.blockCompany);
router.put('/unblock/:companyId', adminController.unblockCompany);

module.exports = router;
