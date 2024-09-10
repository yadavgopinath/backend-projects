const Sequelize=require('sequelize');
const sequelize=require('../util/database');

const Users=sequelize.define('user',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true 
      },
      phone: {
        type: Sequelize.STRING, 
        allowNull: false,
        unique: true 
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true 
      }
 
});
module.exports=Users;