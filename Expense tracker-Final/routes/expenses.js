const express = require('express');
 const router= express.Router();
 const controller = require('../controllers/expenses');

 router.post('/addexpenses',controller.addexpenses);
 router.get('/getexpense',controller.getexpenses);
 router.delete('/delete-expense/:expid',controller.deleteexpenses);

 module.exports = router;