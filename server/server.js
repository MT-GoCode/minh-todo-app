const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const users = require("./routes/users");
const todoOp = require("./routes/todos")
const passport = require("passport");
const app = express();
// Bodyparser middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}); 
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
// DB Config
const db = 'mongodb://localhost:27017/todo';
// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));
const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/", users);
app.use("/todoOp", todoOp);
app.get("/get", (req, res) => {
    res.send('hello')
})

// START OF THE PREVIOUS




// const express = require('express');
// const bodyParser = require('body-parser')
// const path = require('path');
// const User = require('./User')
// var mongoose = require('mongoose')
// var cors = require('cors');
// const logger = require('morgan');

// const app = express();
// app.use(cors());
// const router = express.Router();

// mongoose.connect('mongodb://localhost:27017/todo', {useNewUrlParser: true});
// db = mongoose.connection
// db.once('open', () => console.log('connected to the database'));
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(logger('dev'));

// app.use(express.static(path.join(__dirname, 'build')));

// app.get('/login', function (req, res) {
//     res.send('hello from 4K !')
// });

// app.post('/createAccount', function (req, res) {
//     // User.create({email:req.body.email, password:req.body.password}, function (err, user){
//     //     if (err) res.send(err)
//     //     else res.json(user)
//     // })
//     let user = new User()
//     const { email, password } = req.body
//     user.email = email
//     user.password = password
//     user.save((err) => {
//         if (err) return res.json({ success: false, error: err });
//         return res.json({ success: true });
//     });
// });

// app.listen(process.env.PORT || 4000, ()=>console.log('Listening on port 4K!'));