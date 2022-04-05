const express = require('express');
const router = express.Router();
const Profile = require("../models/profile").Profile;
const User = require("../models/user")
const Review = require("../models/review").Review
const Bar = require("../models/bar").Bar


  
  router.post("/new/:id", async (req, res) => {  
  
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
      await newReview.save()
      //console.log(req.body, "console log req body from reviews.js")
      await Bar.findOneAndUpdate({_id: req.params.id}, {$push: {reviews: newReview._id}})


      
      res.redirect('/dashboard')
    }catch(err){
      console.log(err)
      res.redirect("/register")
    }
  
  })

  router.get("/new/:id", async (req, res) => {
    const reviewquery = await Bar.findById(req.params.id)
    //here we should still add populate reviews when we have reviews in the DB  (.populate.Reviews)
   
    console.log(reviewquery, "console log reviewquery in review.js")

    res.render('review', {
      bar: reviewquery
    })
  })





module.exports = router;
