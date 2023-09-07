const User = require('./model');

module.exports = {
    addUser: (req, res) => {
        const Name = req.body.name1;
        const Email = req.body.email1;
        const Password = req.body.password1;
        User.create({
                Name: Name,
                 Email: Email,
                 Password: Password,
             })
             .then((user) => {
                 res.redirect('/')
             })
             .catch((error) => {
                 res.status(500).json({ message: 'Failed to create user', error: error });
             });
    }
}