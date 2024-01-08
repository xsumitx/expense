const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.SQL_SEVER_DB, process.env.DBUSER, process.env.SQL_SEVER_PASSWORD, {
    host: process.env.SQL_SEVER_HOST,
    dialect:'mysql' 
  });
  module.exports=sequelize;
  
  
  
