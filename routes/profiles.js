const express = require("express");
const router = express.Router();
const Profile = require("../models/profile").Profile;
const User = require("../models/user").User;
const cloudinary = require("cloudinary");
const fileupload = require("express-fileupload");
const passport = require("passport");
const { ensureAuthenticated } = require("../config/auth");

// OUR CODE
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

router.get("/show/:id", ensureAuthenticated, async (req, res) => {
  console.log(req.user);
  try {
    res.render("profile", {
      user: req.user,
    });
  } catch (err) {
    console.log(err);
    res.redirect("/register");
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
    // const fileStr = req.files.image || "https://picsum.photos/300/600";

    // const uploadResponse = await cloudinary.uploader.upload(
    //   fileStr.tempFilePath,
    //   {}
    // );
    // await Profile.findOneAndUpdate(
    //   { _id: req.user.profile._id },
    //   {
    //     $set: {
    //       profilePic: uploadResponse.url,
    //       username: req.body.username,
    //     },
    //   }
    // );
    // const profileTest = await Profile.findOne({_id: req.user.profile._id })
    // console.log(profileTest)
    await Profile.findByIdAndUpdate(req.user.profile._id, {
      username: req.body.username})

    res.redirect("/");
  } catch (err) {
    console.log("ERROR : ", err);
    res.redirect("/dashboard");
  }
});

// returns all Pictures in a JSON file
router.get("/indexjson", (req, res) => {
  Picture.find({}, (err, allThePictures) => {
    res.json({ pictures: allThePictures });
  });
});

// router.post("/new", async (req, res) => {
//   const newProfile = new Profile(req.body)
//   // newProfile.save();
//   try{
//     await newProfile.save()
//     await User.findOneAndUpdate({_id: req.user._id}, {profile: newProfile})
//     res.redirect('/dashboard')

//   }catch(err){
//     console.log(err)
//     res.redirect('/dashboard')
//   }
// })

// code diogostogram
// router.post("/search", async (req, res) => {
//   console.log(req.body)
//   const profiles = await Profile.find({"username": {$regex: req.body.user_input}})
//   res.send({data: profiles})

// })

// const getUserProfileAndPosts = function(id){
//   return Profile.findById(id).populate("posts")
// }

// const renderProfileWithPosts = async function(id, req, res){

//   const posts = await getUserProfileAndPosts(id)
//   console.log(posts)
//   res.render('profile', {
//     user: req.user,
//     posts: posts
//   })
// }

module.exports = router;
