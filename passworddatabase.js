const Fpassword = require('./fptable.js');
const User = require('./model.js');
        
module.exports = {
    updatepass: (req, res) => {
        const uuid= req.body.uuid;
        const password = req.body.password;

        
        console.log(password);

        Fpassword.findOne({ where: { uuid: uuid } })
            .then((fpassword) => {
                if (fpassword) {
                    const id = fpassword.userid;
                    User.findOne({ where: { id: id } })
                        .then((user) => {
                            if (user) {
                                User.update({ password: password }, { where: { id: id } })
                                    .then(() => {
                                        res.status(200).json({ message: 'Password updated successfully' });
                                    })
                                    .catch((err) => {
                                        res.status(500).json({ error: 'Error updating password' });
                                    });
                            } else {
                                res.status(404).json({ error: 'User not found' });
                            }
                        })
                        .catch((err) => {
                            res.status(500).json({ error: 'Error finding user' });
                        });
                } else {
                    res.status(404).json({ error: 'Fpassword not found' });
                }
            })
            .catch((err) => {
                res.status(500).json({ error: 'Error finding Fpassword' });
            });
    }
}
