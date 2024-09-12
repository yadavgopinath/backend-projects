const express= require('express');
const router=express.Router();
const controller=require('../controllers/user');


router.post('/addplayer',controller.addplayer);
router.get('/getplayer/:name',controller.getplayer);
router.put('/editplayers/:name',controller.editplayer);


module.exports=router;