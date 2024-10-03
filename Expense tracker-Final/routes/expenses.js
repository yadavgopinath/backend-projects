const express = require('express');
 const router= express.Router();
 const controller = require('../controllers/expenses');
 const userAuthentication = require('../middleware/auth');

 router.post('/addexpenses',userAuthentication.authenticate,controller.addexpenses);
 router.get('/getexpense',userAuthentication.authenticate,controller.getexpenses);


 router.delete('/delete-expense/:expid',userAuthentication.authenticate,controller.deleteexpenses);

 module.exports = router;