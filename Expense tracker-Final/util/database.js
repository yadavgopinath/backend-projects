const Sequelize = require('sequelize');

const sequelize = new Sequelize('projects-final','root','root',{
      dialect:'mysql',
    host:'localhost'
});
module.exports =sequelize;