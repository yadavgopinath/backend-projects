const express= require('express');
const router=express.Router();
const controller=require('../controllers/user');


router.post('/add-expense',controller.addExpense);
router.get('/get-expense',controller.getexpense);
router.delete('/deleteexpense/:userid',controller.deleteexpense);
router.put('/update-expense/:userid',controller.updateExp);

module.exports=router;