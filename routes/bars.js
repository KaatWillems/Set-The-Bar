const express = require('express');
const router = express.Router();
const Profile = require("../models/profile").Profile;
const Bar = require("../models/bar").Bar
const Review = require("../models/review").Review;
const {ensureAuthenticated} = require('../config/auth')

//const getStars = require("index").getStars

// const cloudinary = require("cloudinary");



// this function is also called in index.js and should be imported (check how)
const getStars = (bar) => { 
    let rating = bar.ratings;
    ratingarr = rating.split(',')
    //console.log(ratingarr)
    starNbr = parseInt(ratingarr[0])
    //console.log(starNbr)
    let finalArr = []
    for (let i = 0; i < starNbr; i++) {
      finalArr.push('*')
      
    }
    if(ratingarr[1]){
      finalArr.push("/")
    } else if (!starNbr[1] && starNbr < 5) {
  
      finalArr.push(" ")
      }
  
  
    return finalArr
  }




router.post("/search", ensureAuthenticated, async (req, res) => {
    if(!req.user.Profile){

        bararr = []
  
        let bars = await Bar.find({addressCity: req.body.userquery})
        // let bars = await Bar.find({name: req.body.userquery})

        bars.forEach(async (bar) => {
          bararr.push({bar: bar, barrating: getStars(bar),reviews: bar.reviews})
//           if (bar.reviews != "") {
//           Array.from(bar.reviews).forEach(review => {
//             console.log(review)
//           })
//           }
        })
        res.render('search',{
          user: req.user,
          bars: bararr
        });
    } else {
        res.render('search',{
            user: req.user,
            bars: bararr,
    
          });
    }


    // console.log(req.body, "from profiles.js brain")
    // const profiles = await Profile.find({"username": {$regex: req.body.user_input}})
    // res.send({data: profiles})
   
  })

  router.get("/search", async (req, res) => {
    res.render('dashboard',{
        user: req.user,
        bars: [],

      });
    //console.log("testtttttttt router.get")


    // console.log(req.body, "from profiles.js brain")
    // const profiles = await Profile.find({"username": {$regex: req.body.user_input}})
     //res.send({data: profiles})
   
  })

  router.get("/show/:id",ensureAuthenticated,  async (req, res) => {
    const barquery = await Bar.findById(req.params.id)
    //here we should still add populate reviews when we have reviews in the DB  (.populate.Reviews)
   
    //console.log(barquery)

    res.render('bardetail', {
      bar: barquery,
      user: req.user
    })
  })



  module.exports  = router;
