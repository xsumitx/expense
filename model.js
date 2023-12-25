const { DataTypes } = require('sequelize');
const sequelize = require('./server'); // Make sure to provide a valid path

const User = sequelize.define('User', {
    Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false
    },

    Password:{
        type:DataTypes.STRING,
        allowNull:true
      },
      status:{
        type:DataTypes.BOOLEAN,
        allowNull:true
     },
     totalexpense: {
        type: DataTypes.INTEGER,
     // You can set this to false if it should always have a value
        defaultValue: 0 // Set a default value of 0 if not provided
    }
    
     
      


    
}, {
    tableName: 'users1' // Set the desired table name here
});

module.exports = User;
