const mongoose = require('mongoose');

const ProfileSchema = require("./profile").ProfileSchema

const ReviewSchema  = new mongoose.Schema({
  rating :{
      type  : Number,
      required : true
  },
  crowd :{
      type  : Number,
      required : true
  },
  hygiene :{
    type  : Number,
    required : true
  },
  atmosphere :{
    type  : Number,
    required : true
  },
  safety :{
    type  : Number,
    required : true
  },
  comment :{
    type  : Number,
  },
  date :{
    type : Date,
    default : Date.now
  },
  profile: ProfileSchema 
});
const Review = mongoose.model('Review',ReviewSchema);

module.exports = {Review, ReviewSchema};
