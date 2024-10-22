const express = require('express');
const router = express.Router();

const forgotpasscontroler= require('../controllers/forgotpassword');

router.post('/forgotpassword',forgotpasscontroler.forgotpassword);

module.exports=router;