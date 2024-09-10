const express= require('express');
const router=express.Router();
const controller=require('../controllers/user');


router.post('/add-user',controller.addusers);
router.get('/get-user',controller.getdata);
router.delete('/deleteuser/:userid',controller.deleteuser);


module.exports=router;