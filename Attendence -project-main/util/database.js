const Sequelize=require('sequelize');

const sequelize= new Sequelize('attendence','root','root',{
    dialect:'mysql',
    host:'localhost'
});
module.exports=sequelize;