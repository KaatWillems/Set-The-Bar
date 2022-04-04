const mongoose = require('mongoose');

const ProfileSchema  = new mongoose.Schema({
  username :{
      type  : String,
      required : true
  },
  profilePic :{
    type  : String,
  },
  requirementsForBars:{
    type  : String,
  },
  date :{  // not sure if we should keep this (kaat)
    type : Date,
    default : Date.now
  },
  favoritebars : [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bar"
    }
  ]
});
const Profile = mongoose.model('Profile',ProfileSchema);

module.exports = {Profile, ProfileSchema};
