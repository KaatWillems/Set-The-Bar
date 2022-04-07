const express = require("express");
const router = express.Router();
const Profile = require("../models/profile").Profile;
const Bar = require("../models/bar").Bar;
const Review = require("../models/review").Review;
const { ensureAuthenticated } = require("../config/auth");

//const getStars = require("index").getStars

// const cloudinary = require("cloudinary");

// this function is also called in index.js and should be imported (check how)
const getStars = (entry) => {
  let rating = entry;
  ratingarr = rating.split(".");
  //console.log(ratingarr)
  starNbr = parseInt(ratingarr[0]);
  //console.log(starNbr)
  let finalArr = [];
  for (let i = 0; i < starNbr; i++) {
    finalArr.push("*");
  }
  if (ratingarr[1]) {
    finalArr.push("/");
  } else if (!starNbr[1] && starNbr < 5) {
    finalArr.push(" ");
  }

  return finalArr;
};

router.post("/search", ensureAuthenticated, async (req, res) => {
  
  if (!req.user.Profile) {
    let barResults = await Bar.find(
        { $or: 
        [
          { addressCity: {$regex : String(req.body.userquery)} },
          { name: {$regex : String(req.body.userquery) }}
        ]      
    }
    )
    // let bars = await Bar.find({name: req.body.userquery})

    let barsNew = barResults.map((bar) => {
      if (bar.averages != undefined) {
        if (bar.averages[0] != undefined) {
          return { ...bar._doc, stars: getStars(bar.averages[0].rating.toString()) };
        } else {
          return { ...bar._doc, stars: getStars("0") };
        }
      }
    });
    res.render("search", {
      user: req.user,
      bars: barsNew,
    });
  } else {
    res.render("search", {
      user: req.user,
      bars: barsNew,
    });
  }

  // console.log(req.body, "from profiles.js brain")
  // const profiles = await Profile.find({"username": {$regex: req.body.user_input}})
  // res.send({data: profiles})
});

router.get("/search", async (req, res) => {
  res.render("dashboard", {
    user: req.user,
    bars: [],
  });

})
  router.get("/show/:id",ensureAuthenticated,  async (req, res) => {
    const barquery = await Bar.findById(req.params.id).populate("averages")

    //console.log(barquery)
    //here we should  add populate reviews when we have reviews in the DB  (.populate.Reviews)

    // let reviewsDB = await Bar.find({ _id: req.params.id}, { reviews: 1 });

    // console.log(reviewsDB)
   
    res.render('bardetail', {
      bar: barquery,
      user: req.user
      
    })





  })




module.exports = router;
