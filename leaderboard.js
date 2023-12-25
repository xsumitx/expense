const Expense = require('./expensemodel.js');
const { Sequelize, Op } = require('sequelize');
const User = require('./model.js');

module.exports = {
  leaderboard: async (req, res) => {
    try {
      // Fetch all users
      const users = await User.findAll();

      // You can send the users as a JSON response
      res.status(200).json({ users: users});
    } catch (error) {
      console.error('Error fetching users:', error);
      // Handle the error and send an error response if needed
      res.status(500).json({ error: 'Error fetching users' });
    }
  }
};


