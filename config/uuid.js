const { v4: uuidv4 } = require('uuid');
const User = require('./model.js');
const Fpassword = require('./ftable.js');

module.exports = {
    updatepassword1: async (req, res) => {
        const email = req.body.emailr;

        try {
            // Find the user by email
            const user = await User.findOne({ where: { email: email } });

            // If the user does not exist, send a response
            if (!user) {
                return res.send('User does not exist');
            }

            // Create a new Fpassword entry for the user
            const uuid=uuidv4();
            await Fpassword.create({ 'uuid': uuid, 'userid': user.id, 'status': false });
            req.body.email=email;
            req.body.uuid=uuid;

            // Send a success response
            res.send('Password updated successfully');
        } catch (error) {
            // Handle any errors that occurred during the process
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }
};

