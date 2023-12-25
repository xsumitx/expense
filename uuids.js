const { v4: uuidv4 } = require('uuid');
const User = require('./model.js');
const Fpassword = require('./fptable.js');
//app.use(express.json());

module.exports = {
    updatePassword1: async (req, res, next) => {
        const email = req.body.email;
        const uuid=uuidv4()

        try {
            // Find the user by email
            const user = await User.findOne({ where: { Email: email } });

            if (user) {
                // If the user exists, create a new Fpassword entry with a UUID
                
                await Fpassword.create({
                     Passowrd:'abc',
                     uuid: uuid, 
                     userid: user.id,
                      status: false });
            }
            const usermail={
            email:email,
            uuid:uuid,
            }
            req.usermail=usermail
            req.body.uuid = uuid;

            // Call the next middleware function or route handler regardless of whether the user exists or not
            next();
        } catch (error) {
            // Handle any errors that occurred during the process
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};