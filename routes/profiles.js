const express = require("express");
const router = express.Router();
const Profile = require("../models/profile").Profile;
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

router.get("/show/:id", ensureAuthenticated, async (req, res) => {

  let profileDB = await Profile.findOne({_id: req.user.profile._id});

  try {
    res.render("profile", {
      user: req.user,
      profile: profileDB
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

    await Profile.findByIdAndUpdate(req.user.profile._id,
      {
        $set: {
          username: req.body.username,
          profilePic: uploadResponse.url,
        }
      }
    )

    res.redirect(`/dashboard`);
  } catch (err) {
    console.log("ERROR : ", err);
    res.redirect("/dashboard");
  }
});


module.exports = router;
