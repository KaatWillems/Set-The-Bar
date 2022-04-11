const express = require("express");
const router = express.Router();
const Profile = require("../models/profile").Profile;
const Bar = require("../models/bar").Bar;
const User = require("../models/user").User;
const cloudinary = require("cloudinary");
const fileupload = require("express-fileupload");
const passport = require("passport");
const { ensureAuthenticated } = require("../config/auth");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const getStars = (bar) => {
  let rating = bar.ratings;
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

router.get("/show/:id", ensureAuthenticated, async (req, res) => {
  let profileDB = await Profile.findOne({ _id: req.user.profile._id });
  let favoriteBarsIDS = profileDB.favoritebars.map((favbar) => {
    return favbar.toString();
  });
  let favoriteBars = [];
  for (const favbar of favoriteBarsIDS) {
    let newfavBar = await Bar.findOne({ _id: favbar });
    newfavBar.stars = getStars(newfavBar);
    favoriteBars.push(newfavBar);
  }
  try {
    res.render("profile", {
      user: req.user,
      profile: profileDB,
      favbars: favoriteBars,
      favbarsids: favoriteBarsIDS
    });
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

// We use express-fileupload middleware to easily have acces to
// the uploaded file. This middleware adds a 'files' entry to the request object
// All the files data are now in `req.files`
// (We will use tmp files to check if this is working)
router.use(fileupload({ useTempFiles: true }));

// pictures routes
router.post("/upload", ensureAuthenticated, async (req, res) => {
  try {
    // `req.files` exists thanks to the express-fileupload middleware :
    const fileStr = req.files.image || "https://picsum.photos/300/600";

    const uploadResponse = await cloudinary.uploader.upload(
      fileStr.tempFilePath,
      {}
    );

    await Profile.findByIdAndUpdate(req.user.profile._id, {
      $set: {
        username: req.body.username,
        profilePic: uploadResponse.url,
      },
    });

    res.redirect(`/dashboard`);
  } catch (err) {
    console.log("ERROR : ", err);
    res.redirect("/dashboard");
  }
});

module.exports = router;
