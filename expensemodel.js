const { DataTypes } = require('sequelize');
const sequelize = require('./server'); // Make sure to provide a valid path

const Expense = sequelize.define('Expense', {
    amount: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },

    category:{
        type:DataTypes.STRING,
        allowNull:true
      },
      


    
}, {
    tableName: 'expense1' // Set the desired table name here
});

module.exports = Expense;
