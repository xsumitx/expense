const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('./server'); // Make sure to provide a valid path

const Pay = sequelize.define('Pay', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey:true,
        autoIncrement:true
    },
    paymentId:Sequelize.STRING,
    orderId:Sequelize.STRING,
    status:Sequelize.STRING
},
   // {
      //  tableName: 'pay' // Set the desired table name here
   // }
   );
      


    

    


module.exports = Pay;
