const Expense = require('./expensemodel.js');
const { Sequelize, Op } = require('sequelize');
const User = require('./model.js');

module.exports = {
  getExpense: async (req, res) => {
    const userId = req.user.id; // Assuming req.user.userId holds the user's ID
    const page = req.query.page || 1; // Get the requested page from query parameters or default to page 1
    const limit = req.query.limit || 10; // Get the limit of expenses per page from query parameters or default to 10

    const offset = (page - 1) * limit; // Calculate the offset based on the requested page

    try {
      const expenses = await Expense.findAndCountAll({
        where: {
          UserId: userId // Filtering expenses based on UserId (assuming this is the column name)
        },
        limit: parseInt(limit), // Ensure the limit is parsed as an integer
        offset: offset
      });

      const totalExpenses = expenses.count;
      const totalPages = Math.ceil(totalExpenses / limit);

      res.status(200).json({
        expenses: expenses.rows,
        totalExpenses,
        totalPages
      });
    } catch (error) {
      console.error('Error fetching expenses:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};
