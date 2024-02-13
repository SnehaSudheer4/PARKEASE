const express = require("express");
const router = express.Router();
const User = require('../Model/User/UserSchema');
const userAuthMiddleware=require('../Middlewares/userAuth')
// const bcrypt = require('bcrypt');
// router.use(userAuthMiddleware);
const { userSignUp, userLogin, handleSearch, userHeader, createReservation,  getUserReservations, createPayment, makeReservation, createPaymentAndReservation } = require("../Controllers/userController");

// User sign-up route
router.post('/signup', userSignUp);
// User login route
router.post('/login' ,userLogin);
//search
router.post('/search',handleSearch)
// router.post('/Reservedetails',createReservation)
router.post('/Reservedetails',createPaymentAndReservation)
router.get('/userheader',userAuthMiddleware,userHeader)
// router.post('/payment', createPayment);
router.get('/reservations/:email', getUserReservations);
router.post('/make-reservation', makeReservation);
module.exports = router;
  




