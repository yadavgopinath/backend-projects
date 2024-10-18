const express = require('express');

const cors = require ('cors');
const bodyParser = require('body-parser');
const app=express();
const sequelize = require('./util/database');
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json({extended:false}));

const userroutes=require('./routes/users');
const expensesroutes = require('./routes/expenses');
const Users = require('./models/users');
const expenses = require('./models/expenses');
const order = require('./models/order');
const { FORCE } = require('sequelize/lib/index-hints');
const purchaseroutes = require('./routes/purchase');
const premiumfeaturesroutes =require('./routes/premiumFeature');

app.use('/user',userroutes);
app.use('/expenses',expensesroutes);
app.use('/purchase',purchaseroutes);
app.use('/premium',premiumfeaturesroutes);

Users.hasMany(expenses);
expenses.belongsTo(Users);
Users.hasMany(order);
order.belongsTo(Users);

sequelize.sync()
  .then((result) => {
   // console.log(result);
    app.listen(3000, () => {
      console.log('Server running on port 3000');
    });
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });

