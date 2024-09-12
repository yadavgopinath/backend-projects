const Sequelize=require('sequelize');

const sequelize= new Sequelize('cricket-career','root','root',{
    dialect:'mysql',
    host:'localhost'
});
module.exports=sequelize;