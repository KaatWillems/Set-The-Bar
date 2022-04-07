const body = document.querySelector("body"),
  searchInput = document.querySelector(".search-input"),
  searchContainer = document.querySelector(".search-container"),
  locationDiv = document.querySelector(".location-general-container"),
  dashboardDiv = document.querySelector(".dashboard-container"),
  setTitle = document.querySelector(".set-the-bar-title"),
  setTheLogoWhite = document.querySelector(".set-the-logo-white"),
  setTheLogoPurple = document.querySelector(".set-the-logo-purple"),
  filterByBtn = document.querySelector(".filterby-btn"),
  filterByContainer = document.querySelector(".filterby-container"),
  filterContainer = document.querySelector(".filter-container"),
  xBtn = document.querySelector(".x"),
  carouselImages = document.querySelectorAll(".carousel-image"),
  reviewContainer = document.querySelector(".review-container"),
  resultsContainer = document.querySelector(".results-container");

if (searchInput != undefined) {
  searchInput.addEventListener("focus", () => {
    locationDiv.style.display = "flex";
    dashboardDiv.style.display = "none";
  });

  searchInput.addEventListener("blur", () => {
    locationDiv.style.display = "none";
    dashboardDiv.style.display = "flex";
  });
}

if (xBtn != undefined) {
  xBtn.addEventListener("click", () => {
    searchContainer.style.display = "flex";
    filterByContainer.style.display = "flex";
    filterContainer.style.display = "none";
    resultsContainer.style.display = "flex";
    body.style.backgroundColor = "#4d194d";
    setTheLogoWhite.style.display = "flex";
    setTheLogoPurple.style.display = "none";
  });
}

if (filterByBtn != undefined) {
  filterByBtn.addEventListener("click", () => {
    searchContainer.style.display = "none";
    filterByContainer.style.display = "none";
    filterContainer.style.display = "flex";
    resultsContainer.style.display = "none";
    body.style.backgroundColor = "whitesmoke";
    setTheLogoWhite.style.display = "none";
    setTheLogoPurple.style.display = "block";
  });
}

if (reviewContainer) {
  body.style.backgroundColor = "whitesmoke";
  setTheLogoWhite.style.display = "none";
  setTheLogoPurple.style.display = "block";
}

// FILTERING ALGORITHM

const applyFilter = document.querySelector(".apply-filter"),
  filterSliders = document.querySelectorAll(".filter-slider"),
  starInputs = document.querySelectorAll(".stars .rate input"),
  barCards = document.querySelectorAll(".bar-card");

const getStarsValue = () => {
  let x = 0;
  starInputs.forEach((star) => {
    if (star.checked) {
      x = x + parseInt(star.value);
    }
  });
  return x;
};

const getFilterValues = () => {
  return (filterValues = {
    rating: parseInt(getStarsValue()),
    crowd: parseInt(filterSliders[0].value),
    hygiene: parseInt(filterSliders[1].value),
    atmosphere: parseInt(filterSliders[2].value),
    safety: parseInt(filterSliders[3].value),
  });
};

const getResults = () => {
  let results = [];
  barCards.forEach((barCard, index) => {
    let barResult = {
      id: barCard.id,
      rating: Math.round(parseFloat(barCard.dataset.rating)),
      crowd: Math.round(parseFloat(barCard.dataset.crowd)),
      hygiene: Math.round(parseFloat(barCard.dataset.hygiene)),
      atmosphere: Math.round(parseFloat(barCard.dataset.atmosphere)),
      safety: Math.round(parseFloat(barCard.dataset.safety)),
    };
    results.push(barResult);
  });
  return results;
};

const checkCriteria = (a, b) => {
  let check;
  if (a <= b) {
    check = true;
  } else {
    check = false;
  }
  return {check, points: b};
};

// const getRange = (a) => {
//   let range;
//   if (a <= 3) {
//     range = "first";
//   } else if (a <= 6 && a >= 4) {
//     range = "second";
//   } else if (a <= 9 && a >= 7) {
//     range = "third";
//   } else if (a === 0) {
//     range = "none";
//   }
//   return range;
// };

// const checkRange = (userValue, barValue) => {
//   let rangeUser = getRange(userValue);
//   let rangeBar = getRange(barValue);
//   let check, points;
//   if (rangeUser === rangeBar) {
//     check = true;
//     points = barValue - userValue + 2;
//   } else {
//     check = false;
//     points = -1;
//   }
//   return { check, points };
// };

// const atmosphereRating = (userValue, barValue) => 8 - Math.abs(userValue - barValue)
// const safetyRating = (userValue, barValue) => 8 + (userValue - barValue)

const compareAndDisplay = (filterValues, barResults) => {
  let revisions = [];
  barResults.forEach((barResult) => {
    let revision = {
      index: barResult.id,
      rating: checkCriteria(filterValues.rating, barResult.rating),
    //   crowd: checkRange(filterValues.crowd, barResult.crowd),
    //   hygiene: checkRange(filterValues.hygiene, barResult.hygiene),
    //   atmosphere: atmosphereRating(filterValues.atmosphere, barResult.atmosphere),
    //   safety: safetyRating(filterValues.safety, barResult.safety)
    };
    revisions.push(revision);
  });
  console.log(revisions);
};

if (applyFilter != undefined) {
  applyFilter.addEventListener("click", async (e) => {
    e.preventDefault();
    let filterValues = getFilterValues();
    let baresults = getResults();
    compareAndDisplay(filterValues, barResults);
  });
}
