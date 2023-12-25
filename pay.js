const Razorpay = require('razorpay');
const Pay = require('./paymodel.js');

module.exports={
purchasepremium :async (req, res) => {
  const userId=req.user.id;
  try {
    var rzp = new Razorpay({ key_id: 'rzp_test_1tCneML7rUyQxi', key_secret: 'WHvrvCrDddkq5mL8bBkzZKFu' });

    var options = {
      amount: 50000, // amount in the smallest currency unit
      currency: "INR",
      
    };

    rzp.orders.create(options, function (err, razorpayOrder) {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'Razorpay order creation failed' });
      }

      // Assuming you want to create a corresponding order in your application's database
      Pay.create({ paymentId: razorpayOrder.id, status: 'PENDING',UserId:userId }) // orderId will be set to null initially
        .then((createdOrder) => {
          // Now that you have created the order, you can set the orderId
          createdOrder.update({ orderId: createdOrder.id })
            .then((updatedOrder) => {
              Pay.update({orderId:razorpayOrder.id},{where:{paymentId:razorpayOrder.id}})
              return res.status(201).json({ razorpayOrder, updatedOrder,keyid:rzp.key_id });
            })
            .catch((updateOrderError) => {
              console.log(updateOrderError);
              return res.status(500).json({ error: 'Order creation failed' });
            });
        })
        .catch((createOrderError) => {
          console.log(createOrderError);
          return res.status(500).json({ error: 'Order creation failed' });
        });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
};


