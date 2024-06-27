const express = require('express');
const router=express.Router();
const authController=require('../controllers/auth.controller');

router.post('/email',authController.sendOtpEmail)
router.post('/verifyotp',authController.verifyOtp)
router.post('/forgotpassword',authController.forgotPasswords)

module.exports = router