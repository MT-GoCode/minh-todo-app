const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
// user schema
const User = require("../models/User");

router.post("/createAccount", (req, res) => {
    
//   take body and validate
  const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
      return res.status(200).json({errors: errors});
    }
// otherwise, search database to see if overlaps
  User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.status(200).json({errors: { email: "Email already exists" }});
      }
      else { // or then just save that thing
    User.create(req.body, function(err, user) {
        if (err) res.send(err)
        else res.json(user)                      
    })
    TodoUser.create({user: req.body.email, todos: []}, function (err, todoUser) {
        if (err) res.send(err)
    })
}
})
})


// LOGIN ENDPOINT
router.post("/login", (req, res) => {
 // validating input
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
        return res.status(200).json({errors: errors});
    }
    const email = req.body.email;
    const inputPassword = req.body.password;
    // // Find user by email
    User.findOne({ email: email }, function (err, user) {
        if (!user) {
            res.status(200).json({errors: { email: "Email not found" }});
        } 
        // Check password
        else if (inputPassword !== user.password) { 
            res
            .status(200)
            .json({errors: { password: "Password incorrect" }});
        } else {
            res.json(email)
        }
        // jwt.sign(
        //     payload,
        //     "secret",
        //     {
        //       expiresIn: 31556926 // 1 year in seconds
        //     },
        //     (err, token) => {
        //       res.json({
        //         success: true,
        //         token: "Bearer " + token
        //       });
        //     }
        // //   );
        // res.json(user)
    })
    
  });

module.exports = router;