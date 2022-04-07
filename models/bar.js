const mongoose = require('mongoose');

const BarSchema  = new mongoose.Schema({
  name :{
      type  : String,
      required : true
  } ,
  addressZip :{
    type  : String,
    
  } ,
  addressCity :{
    type  : String,
    required : true
  } ,
  addressStreet: {
    type  : String,
    
  },
  addressNumber: {
    type  : String,   // I put string because sometimes the housenumber can contain letters 
    
  },
  addressCountry: {
    type  : String,  
    required : true
  },
  siteUrl: {
    type  : String,
  },
  schedule: {
    type  : String,
  },
  pictureUrl: {
    type  : String,
  },
  ratings: {
    type  : String,
  },
  reviews : [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review"
    }
  ],
  averages: [{
    ratingType: String,
    rating: Number
    
  }]
  // averages : [
  //   {rating: {
  //     type: Number
  //   }},
  //   {crowd: {
  //     type: Number
  //   }},
  //   {hygiene: {
  //     type: Number
  //   }},
  //   {atmosphere: {
  //     type: Number
  //   }},
  //   {safety: {
  //     type: Number
  //   }}
  // ]
});

const Bar = mongoose.model('Bar',BarSchema);

module.exports = {Bar, BarSchema};

