const fs = require("fs");
const { Bar, BarSchema } = require("../bar.js");
const mongoose = require("mongoose");

const sendBarsToDB = () => {
  mongoose
    .connect(
      "mongodb+srv://Setthebar:Setthebar100@cluster0.pxj0m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("connected with Setthebar DB"))
    .catch((err) => console.log(err));
  let jsonBars = JSON.parse(fs.readFileSync("./allbars.json"));
  jsonBars.forEach((bar) => {
    
    let zipCode = "", city = "", country = "", street = "", number = "", newstreet = "";

    // COMMENT OUT THE CODES DEPENDING ON THE WEBSITE BEFORE STARTING

    // CODE FOR GOOGLE BARS
    // let handleAddress = bar.address.split(",")
    // let postcodeCityCountry = handleAddress[handleAddress.length - 1].split(" ")
    // country = postcodeCityCountry[postcodeCityCountry.length - 1]
    // city = postcodeCityCountry[postcodeCityCountry.length - 2]
    // if (postcodeCityCountry[postcodeCityCountry.length - 3]) {
    //   zipCode = postcodeCityCountry[postcodeCityCountry.length - 3]
    // } else {
    //   zipCode = ""
    // }
    // if (handleAddress.length > 2) {
    //   handleAddress.forEach(word => {
    //     if (word != handleAddress.pop()) {
    //       street = street + word + " "
    //     }
    //   })
    // } else if (handleAddress.length === 2){
    //   street = handleAddress[0]
    // } else {
    //   street = ""
    // }
    // street = street.split(' ')
    // number = street.pop()
    // let newstreet = ""
    // street.forEach(word => {
    //   newstreet = newstreet + word + " "
    // });
    
    // CODE FOR DATLINQS BARS
    // let newArray = bar.address.split("\n");
    // let newstring = "";
    // newArray.forEach((element) => {
    //   newstring = newstring + element + " ";
    //   let lastArray = newstring.split(" ");
    //   let newString2 = "";
    //   lastArray.forEach((elemento) => {
    //     zipCode = lastArray[0];
    //     city = lastArray[1];
    //     country = lastArray[2];
    //   });
    // });
    
    const newBar = new Bar({
      name: bar.barname,
      addressZip: zipCode,
      addressCity: city,
      addressStreet: newstreet,
      addressNumber: number,
      addressCountry: country,
      siteUrl: bar.siteUrl,
      schedule: bar.schedule,
      pictureUrl: bar.pictureUrl,
      ratings: bar.rating,
      // reviews: [] // reviewDB
    });

    newBar
      .save()
      .then((value) => {
        console.log(value);
      })
      .catch((value) => console.log(value));
  });
};

sendBarsToDB();