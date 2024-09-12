const Sequelize=require('sequelize');
const sequelize=require('../util/database');

const Players=sequelize.define('player',{
   
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true 
  },
  dateOfBirth: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  photoUrl: {
    type: Sequelize.STRING,
    allowNull: true
  },
  birthPlace: {
    type: Sequelize.STRING,
    allowNull: false
  },
  careerInfo: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  matches: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  score:{
    type:Sequelize.INTEGER,
    allowNull:true
  },
  fifties: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  centuries: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  wickets: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  average: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
});

module.exports=Players;