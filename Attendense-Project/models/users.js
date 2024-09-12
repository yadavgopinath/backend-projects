const Sequelize=require('sequelize');
const sequelize=require('../util/database');

const Attendence=sequelize.define('attendence',{
   
  date: {
    type: Sequelize.DATEONLY,
    allowNull: false,
    primaryKey: true,
  },
  records: {
    type: Sequelize.JSON,
    allowNull: false,
  }
},    
   
);
module.exports=Attendence;