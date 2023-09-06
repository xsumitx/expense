const User = require('./model');

module.exports = {
    addUser: (req, res) => {
        const Name = req.body.name;
        const Email = req.body.email;
        const Password = req.body.password;

        // Define the criteria to check if the user with the same email exists
        const criteria = {
            Email: Email,
        };

        // Check if a user with the given email already exists
        User.findOne({
            where: criteria,
        })
        .then((existingUser) => {
            if (existingUser) {
                // A user with the same email already exists
                res.status(400).json({ message: 'User with this email already exists' });
            } else {
                // User does not exist, you can proceed to create it
                User.create({
                    Name: Name,
                    Email: Email,
                    Password: Password,
                })
                .then((user) => {
                    res.status(201).json({ message: 'User created successfully', user: user });
                })
                .catch((error) => {
                    res.status(500).json({ message: 'Failed to create user', error: error });
                });
            }
        })
        .catch((error) => {
            console.error('Error checking for existing user:', error);
            res.status(500).json({ message: 'Failed to check for existing user', error: error });
        });
    }
};
