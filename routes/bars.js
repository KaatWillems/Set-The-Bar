const express = require('express');
const router = express.Router();
const Profile = require("../models/profile").Profile;
const Bar = require("../models/bar").Bar
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




router.post("/search", async (req, res) => {
    //console.log("testtttttttt router.post")
    //console.log(req.body, "req.body")
    if(!req.user.Profile){

        bararr = []
  
        // let bars = await Bar.find({addressCity: req.body.userquery})
        let bars = await Bar.find({name: req.body.userquery})

        bars.forEach((bar) => {
          bararr.push({bar: bar, barrating: getStars(bar)})
          
        })
        //console.log(bararr)
        // let trendingbars
        res.render('dashboard',{
          user: req.user,
          bars: bararr,
  
        });
    } else {
        res.render('dashboard',{
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



  module.exports  = router;
