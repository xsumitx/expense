const { DataTypes } = require('sequelize');
const sequelize = require('./server'); // Make sure to provide a valid path

const Fpassword = sequelize.define('Fpassword',{ 

    Password:{
        type:DataTypes.STRING,
        allowNull:true
      },
      status:{
        type:DataTypes.BOOLEAN,
        allowNull:true
     },
     userid:{
        type:DataTypes.INTEGER,
        allowNull:false
     },
     uuid:{
        type:DataTypes.STRING,
    },
    },
   
     {
        tableName: 'forgtpassword' // Set the desired table name here
    });
    
    module.exports = Fpassword;
     
    
     
      


    

