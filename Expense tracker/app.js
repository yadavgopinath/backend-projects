const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const cors=require('cors');

const app = express();

const sequelize=require('./util/database');
const Userexp=require('./models/users');
const { error } = require('console');



const userexproutes=require('./routes/user');

app.use(cors());

app.use(bodyParser.json({ extended: false }));


app.use('/user', userexproutes);

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

