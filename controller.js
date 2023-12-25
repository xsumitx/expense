// controller.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./model'); // Import your Sequelize User model here
//app.use(express.json());
module.exports = {
    addUser: async (req, res) => {
        const { email, password } = req.body;
        

        try {
            // Find the user by email
            const user = await User.findOne({ where: { email } });

            if (!user) {
                return res.status(401).json({ message: 'User does not exist' });
            }

            // Compare the provided password with the hashed password
            const isPasswordMatch = await bcrypt.compare(password, user.Password);

            if (isPasswordMatch) {
                // Generate a JWT token
                const token = jwt.sign({ userId: user.id }, 'efagiueafhafgciegiuegwagefiug');

                // Send the token as a response
                res.status(200).json({ token });
            } else {
                // Passwords do not match
                return res.status(401).json({ message: 'Invalid email or password' });
            }
        } catch (error) {
            console.error('Error during login:', error);
            return res.status(500).json({ message: 'Login failed', error: error.message });
        }
    }
};
