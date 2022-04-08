const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { Profile, ProfileSchema } = require("../models/profile");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { ensureAuthenticated } = require("../config/auth");

//login handle
router.get("/login", (req, res) => {
  res.render("login");
});
router.get("/register", (req, res) => {
  res.render("register");
});
router.get("/createprofile", ensureAuthenticated, (req, res) => {
  console.log("create profile ", req.user);
  res.render("createprofile", {
    user: req.user,
  });
});
//Register handle
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

//register post handle
router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please fill in all fields" });
  }
  //check if match
  if (password !== password2) {
    errors.push({ msg: "passwords dont match" });
  }

  //check if password is more than 6 characters
  if (password.length < 6) {
    errors.push({ msg: "password atleast 6 characters" });
  }
  if (errors.length > 0) {
    res.render("register", {
      errors: errors,
      name: name,
      email: email,
      password: password,
      password2: password2,
    });
  } else {
    //validation passed
    User.findOne({ email: email }).exec((err, user) => {
      if (user) {
        errors.push({ msg: "email already registered" });
        res.render("register", { errors, name, email, password, password2 });
      } else {
        const newProfile = new Profile({
          username: "username",
        });
        newProfile.save();
        const newId = newProfile._id
        const newUser = new User({
          name: name,
          email: email,
          password: password,
          profile: newId
        });
        //hash password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            //save pass to hash
            newUser.password = hash;
            //save user
            newUser
              .save()
              .then((value) => {
                req.flash("success_msg", "You have now registered!");
                res.redirect("/users/login");
              })
              .catch((value) => console.log(value));
          })
        );
      }
    });
  }
});

//logout
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "Now logged out");
  res.redirect("/users/login");
});
module.exports = router;
