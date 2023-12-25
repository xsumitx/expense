const Expense = require('./expensemodel'); // Assuming the model for expenses is named Expense
const User = require('./model.js');
module.exports = {
    addexpense: async (req, res) => {
      
        // Corrected variable name
        const { amount, description, category } = req.body;
        const UserId = req.user.id;
        try {
            const newExpense = await Expense.create({
                amount: amount,
                description: description,
                category: category,
                UserId: UserId// Corrected variable name
            });

            // Correct the way you fetch and update the user's total expense
            const user = await User.findOne({ where: { id: UserId } });
            if (user) {
              //  const updatedTotalExpense = user.totalexpense + amount;
                await user.update({ totalexpense: user.totalexpense+amount });
            } else {
                // Handle the case where the user with the specified ID doesn't exist
                res.status(404).json({ error: 'User not found' });
                return;
            }

            res.status(201).json({ message: 'Expense added successfully', expense: newExpense });
        } catch (error) {
            console.error('Error adding expense:', error);
            // Handle the error and send an error response if needed
            res.status(500).json({ error: 'Error adding expense' });
        }
    }
};
