const express = require('express');
const router = express.Router();
const Profile = require("../models/profile").Profile;
const User = require("../models/user")
const Review = require("../models/review").Review


  
  router.post("/new", async (req, res) => {  
  
    try{
        // let p = await Profile.find(user_id: req.user._id) //first create a page to make profiles
      const newReview = new Review({            
        rating : req.body.reviewstars,
        crowd : req.body.reviewcrowd,
        hygiene : req.body.reviewhygiene,
        atmosphere : req.body.reviewatmosphere,
        safety : req.body.reviewsafety,
        comment : req.body.reviewcomment              
        // profile: p 
      })

      console.log(req.body, "console log req body from reviews.js")

      await newReview.save()
      res.redirect('/dashboard')
    }catch(err){
      console.log(err)
      res.redirect("/register")
    }
  
  })

module.exports = router;
