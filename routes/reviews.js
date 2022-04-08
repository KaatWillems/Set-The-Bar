const express = require("express");
const router = express.Router();
const Profile = require("../models/profile").Profile;
const User = require("../models/user");
const Review = require("../models/review").Review;
const Bar = require("../models/bar").Bar;
const { ensureAuthenticated } = require("../config/auth");

const getAverages = async (id) => {
  
}

router.post("/new/:id", async (req, res) => {
  try {
    // let p = await Profile.find(user_id: req.user._id) //first create a page to make profiles
    const newReview = new Review({
      rating: req.body.reviewstars,
      crowd: req.body.reviewcrowd,
      hygiene: req.body.reviewhygiene,
      atmosphere: req.body.reviewatmosphere,
      safety: req.body.reviewsafety,
      comment: req.body.reviewcomment,
      // profile: p
    });
    await newReview.save();
    //console.log(req.body, "console log req body from reviews.js")
    await Bar.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { reviews: newReview._id } }
    );
    // get the lenght of the reviews to calculate average: 
    let reviewsDB = await Bar.find({ _id: req.params.id}, { reviews: 1 });
    let reviewsIds = reviewsDB[0].reviews;
    let length = reviewsIds.length;
    let rating = 0,
      crowd = 0,
      hygiene = 0,
      atmosphere = 0,
      safety = 0;
      //finding all the ids of the reviews and make an array of them, and sum all the values of the reviews
    for (const reviewId of Array.from(reviewsIds)) {
      let reviewDB = await Review.find({ _id: reviewId });
      let review = reviewDB[0];
      rating = rating + review.rating;
      crowd = crowd + review.crowd;
      hygiene = hygiene + review.hygiene;
      atmosphere = atmosphere + review.atmosphere;
      safety = safety + review.safety;
    }
    //updating averages in the Bar model:
      await Bar.findOneAndUpdate(
        { _id: req.params.id },
        {$set: { 
          averages: [{
            ratingType: 'rating', rating: Math.round((rating / length) * 10) / 10
          },
          {
            ratingType: 'crowd', rating: Math.round((crowd / length) * 10) / 10
          },
          {
            ratingType: 'hygiene', rating: Math.round((hygiene / length) * 10) / 10
          },
          {
            ratingType: 'atmosphere', rating: Math.round((atmosphere / length) * 10) / 10
          },
          {
            ratingType: 'safety', rating: Math.round((safety / length) * 10) / 10
          }]
        }}
      );
    res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
    res.redirect("/register");
  }
});

router.get("/new/:id", ensureAuthenticated, async (req, res) => {
  const reviewquery = await Bar.findById(req.params.id);
  

  console.log(reviewquery, "console log reviewquery in review.js");

  res.render("review", {
    user: req.user,
    bar: reviewquery,
  });
});

module.exports = router;
