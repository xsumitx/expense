const User = require('./model');
const bcrypt = require('bcrypt');

module.exports = {
    addNewUser: async (req, res) => {
        try {
            const { name1, email1, password1 } = req.body;

            // Validate and sanitize user inputs here, if needed.

            // Hash the password
            const hashedPassword = await bcrypt.hash(password1, 10);

            // Create a new user with the hashed password
            const user = await User.create({
                Name: name1,
                Email: email1,
                Password: hashedPassword, // Store the hashed password in the database
            });

            // Redirect to a success page or send a success response
            res.redirect('/');
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ message: 'Failed to create user', error: error.message });
        }
    }
}
