const express = require("express");
const router = express.Router();
const Profile = require("../models/profile").Profile;
const Bar = require("../models/bar").Bar;
const User = require("../models/user").User;
const cloudinary = require("cloudinary");
const fileupload = require("express-fileupload");
const passport = require("passport");
const { ensureAuthenticated } = require("../config/auth");

const checkRating = (a, b) => {
  let points;
  if (a <= b) {
    points = b + 4;
  } else {
    points = 0;
  }
  return points;
};

const checkRange = (userValue, barValue) => {
  if (barValue != 0) {
    points = -Math.abs(barValue - userValue) + 9;
  } else {
    points = 0;
  }
  return points;
};
const checkImportance = (userValue, barValue) => {
  let points;
  if (userValue <= barValue) {
    points = barValue;
  } else {
    points = 0;
  }
  return points;
};

const getStars = (rating) => {
  ratingarr = rating.split(",");
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

const compareAndDisplay = (filterValues, barResults) => {
  let matchedBars = [];
  barResults.forEach((barResult, index) => {
    let match;
    if (barResult.averages.length != 0) {
      (rating = checkRating(
        filterValues.rating,
        Math.round(barResult.averages[0].rating)
      )),
        (crowd = checkRange(
          filterValues.crowd,
          Math.round(barResult.averages[1].rating)
        )),
        (hygiene = checkImportance(
          filterValues.hygiene,
          Math.round(barResult.averages[2].rating)
        )),
        (atmosphere = checkRange(
          filterValues.atmosphere,
          Math.round(barResult.averages[3].rating)
        )),
        (safety = checkImportance(
          filterValues.safety,
          Math.round(barResult.averages[4].rating)
        ));
      match = rating + crowd + hygiene + atmosphere + safety;
      barResult.stars = getStars(barResult.averages[0].rating.toString());
    } else {
      match = 0;
      barResult.stars = [" ", " ", " ", " ", " "];
    }
    barResult.match = match;

    matchedBars.push(barResult);
  });
  matchedBars.sort((a, b) => b.match - a.match);
  return matchedBars;
};

const bestMatch = async () => {
  let bars = Array.from(await Bar.find({ addressCity: "Bruxelles" }));
  filterValues = {
    rating: 4,
    crowd: 9,
    hygiene: 9,
    atmosphere: 1,
    safety: 9,
  };
  return compareAndDisplay(filterValues, bars);
};

router.get("/", ensureAuthenticated, async (req, res) => {
  let matchedBars = await bestMatch();

  if (!req.user.Profile) {
    res.render("findmeabar", {
      user: req.user,
      bars: matchedBars,
    });
  } else {
    renderDashboardWithPosts(req, res);
  }
});
module.exports = router;
