const express = require("express");
const router = express.Router();
const User = require('../Model/User/UserSchema');
const userAuthMiddleware=require('../Middlewares/userAuth')
// const bcrypt = require('bcrypt');
// router.use(userAuthMiddleware);
const { userSignUp, userLogin, handleSearch, userHeader, createReservation,  viewDetails, getUserReservations, createPayment } = require("../Controllers/userController");

// User sign-up route
router.post('/signup', userSignUp);
// User login route
router.post('/login' ,userLogin);
//search
router.post('/search',handleSearch)
router.post('/Reservedetails',createReservation)
router.get('/userheader',userAuthMiddleware,userHeader)
router.post('/payment', createPayment);
router.get('/reservations/:email', getUserReservations);
module.exports = router;
  




