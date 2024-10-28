const express = require('express');

const cors = require ('cors');
const bodyParser = require('body-parser');
const app=express();
const sequelize = require('./util/database');
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json({extended:false}));
app.use(express.urlencoded({ extended: true }));


const userroutes=require('./routes/users');
const expensesroutes = require('./routes/expenses');
const Users = require('./models/users');
const expenses = require('./models/expenses');
const order = require('./models/order');
const download=require('./models/download');
const { FORCE } = require('sequelize/lib/index-hints');
const purchaseroutes = require('./routes/purchase');
const premiumfeaturesroutes =require('./routes/premiumFeature');
const forgotpasswordroute = require('./routes/forgotpassword');
const ForgotPasswordRequests = require('./models/ForgotPassword');


app.use('/user',userroutes);
app.use('/expenses',expensesroutes);
app.use('/purchase',purchaseroutes);
app.use('/premium',premiumfeaturesroutes);
app.use('/password',forgotpasswordroute);

Users.hasMany(expenses);
expenses.belongsTo(Users);
Users.hasMany(order);
order.belongsTo(Users);
Users.hasMany(ForgotPasswordRequests, { onDelete: 'CASCADE' }); 
ForgotPasswordRequests.belongsTo(Users); 
Users.hasMany(download);
download.belongsTo(Users);

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

