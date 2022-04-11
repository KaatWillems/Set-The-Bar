const express = require("express");
const router = express.Router();
const Profile = require("../models/profile").Profile;
const { ensureAuthenticated } = require("../config/auth");

router.post("/addfavorites", ensureAuthenticated, async (req, res) => {
  if (req.body.action === "add") {
    await Profile.findOneAndUpdate(
      { _id: req.user.profile._id },
      { $push: { favoritebars: req.body._id } }
    );
  } else {
    await Profile.findOneAndUpdate(
      { _id: req.user.profile._id },
      { $pull: { favoritebars: req.body._id } }
    );
  }
});

module.exports = router;
