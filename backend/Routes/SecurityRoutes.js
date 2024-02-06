const express = require('express');
const securityController = require('../Controllers/securityController');
const securityAuthMiddleware=require('../Middlewares/securityAuth');


// const { getSecurityList } = require('../Controllers/companyController');

const router = express.Router();

// Route for security login
router.post('/securitylogin', securityController.securityLogin);
router.post('/addReservedetails',securityController.addReservation)
router.get('/Securityuserlist/:companyName',securityAuthMiddleware,securityController.getSecurityUserList)
router.post('/usersearch',securityController.searchUser)
// Check-in a user
router.post('/checkin/:userId', securityController.checkInUser);
// Check-out a user
router.post('/checkout/:userId', securityController.checkOutUser);

router.get('/securityheader',securityAuthMiddleware,securityController.securityHeader);
router.get('/securityslot/:companyName',securityController.getSlotsForSecurity)

module.exports = router;
