require('dotenv').config();
const razorpay = require('razorpay');

const express=require('express');
const app=express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
//const dotenv = require('dotenv').config({ path: './config/.env' });
app.use(express.static('public'));






const axios=require('axios');
const path=require('path');
const sequelize=require('./server.js');
const controller=require('./controller.js')
const controller1=require('./newUsercontroller.js')
const bodyParser = require('body-parser');
const expenseController=require('./addexpense.js')
const getexpenses=require('./getexpense.js');
const authorisation=require('./auth.js')
app.use(bodyParser.urlencoded({ extended: true }));
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
//const model1=require('./model.js')
const User = require('./model');
const Expense=require('./expensemodel.js');
const Pay=require('./paymodel.js');
const buy=require('./pay.js');
const prem=require('./payment.js')
const leaderboard=require('./leaderboard.js')
const forgetpassword=require('./config/password.js')
const Fpassword=require('./fptable.js');
const update=require('./uuids.js');
const databasep=require('./passworddatabase')
//const helmet=require('helmet');

const compression=require('compression');
app.use(compression());
const morgan=require('morgan');
app.use(morgan('combined')); 
const staticFilesDirectory = path.join(__dirname, 'public');

// Serve static files

app.use(express.static(__dirname + '/public'));
//app.use(express.static('/public'));
//app.use(express.static('public', {
  //  setHeaders: (res, path) => {
    //  if (path.endsWith('.js')) {
      //  res.setHeader('Content-Type', 'application/javascript');
      //}
    //},
  //}));
  

app.post('/login',controller.addUser);
app.get('/register',(req,res)=>{
    const form=`
    <form action="/register" method="POST">
        <label for="name1">Name</label>
        <input type="text" id="name1" name="name1" required>
        <label for="email1">Email</label>
        <input type="email" id="email1" name="email1" required>
        
        <label for="password1">Password</label>
        <input type="password" id="password1" name="password1" required>
        
        <button type="submit">Register</button>
    </form>`
    res.send(form);node
});
//app.get('/expense',(req,res)=>{
  //  res.sendFile(path.join(__dirname,'expense.html'));
 //})
app.post('/register',controller1.addNewUser);

app.get('/expense',authorisation.authenticateUser,getexpenses.getExpense);
app.post('/expense',authorisation.authenticateUser,expenseController.addexpense);
app.get('/premiumUser',authorisation.authenticateUser,buy.purchasepremium);
app.post('/payment',authorisation.authenticateUser,prem.updateUser)
//app.get('/expense',getexpenses.getExpense);
app.get('/leaderboard',authorisation.authenticateUser,leaderboard.leaderboard)
//console.log(update);

app.post('/password',update.updatePassword1,async (req, res) => {
    const  email = req.body.email;
    const uuid=req.body.uuid; // Assuming your request contains an 'email' field
  
    // Call the function to send the email
   // console.log(uuid)
   console.log('Request Body:', req.body);
    await forgetpassword(email,uuid);
})
 app.get('/newpassword/:uuid',(req,res)=>{
    //res.type('text/javascript');
     res.sendFile(path.join(__dirname,'/public/newpassword.html'));
   // express.static(path.join(__dirname,'newpassword.html'))
   });
app.post('/newpassword',databasep.updatepass);
//pp.post('/download',)


User.hasMany(Expense); // A user can have many expenses
Expense.belongsTo(User)
User.hasMany(Pay); // A user can have many expenses
Pay.belongsTo(User)

User.hasMany(Fpassword);
Fpassword.belongsTo(User);


    console.log(process.env.PORT)
sequelize.sync()
app.listen(process.env.PORT,()=>{
    console.log('working')
})
