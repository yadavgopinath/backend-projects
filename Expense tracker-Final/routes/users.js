const express = require ('express');
const router = express.Router();
const controller=require('../controllers/users');

router.post('/signup',controller.addUsers);

module.exports=router;