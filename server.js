const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.SQL_SEVER_DB, 'root', process.env.SQL_SEVER_PASSWORD, {
    host: process.env.SQL_SERVER_HOST,
    dialect:'mysql' 
  });
  module.exports=sequelize;
  
  
  