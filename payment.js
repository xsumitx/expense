const Pay = require('./paymodel.js');
const User = require('./model.js');

module.exports = {
  updateUser: async (req, res) => {
    const { order_id, payment_id } = req.body;
    const user = req.user;
    const userId = user.id;
    

    try {
      // Update the payment record associated with the order_id, payment_id, and UserId
      await Pay.update(
        { status: 'Successful' },
        {
          where: {
            
           // orderId: order_id,
            paymentId: payment_id,
           // UserId: userId,
          },
        }
      );

      // If you want to update the user's information, you can do it here as well
      // For example, you can update the user's premium status or other attributes

      return res.status(200).json({ message: 'Payment status updated to Successful' });
    } catch (error) {
      console.error('Error updating payment status:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};
