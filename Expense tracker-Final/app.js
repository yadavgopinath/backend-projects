const express = require('express');

const cors = require ('cors');
const bodyParser = require('body-parser');
const app=express();
const sequelize = require('./util/database');

app.use(cors());
app.use(bodyParser.json({extended:false}));

const userroutes=require('./routes/users');
const Users = require('./models/users');

app.use('/user',userroutes);

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

