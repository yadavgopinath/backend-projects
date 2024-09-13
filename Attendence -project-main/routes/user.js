const express= require('express');
const router=express.Router();
const controller=require('../controllers/user');


router.get('/search',controller.searchDetails);
router.post('/postattendence',controller.postAttendence);
router.get('/fetchdata',controller.fetchdata);


module.exports=router;