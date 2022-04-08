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
  UpdateProfileButton = document.querySelector('#modify-profile-btn');

  updateWindow = document.querySelector('.modify-profile-form-container')

  


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

// CLEAR BUTTON

let clearBtn = document.querySelector(".clear")

clearBtn.addEventListener("click", () => {

//clear the ranges (put them on 5):
let filtersliders = document.querySelectorAll(".filter-slider")

for (let i = 0; i < filtersliders.length; i++) {
    filtersliders[i].value = "5";
  
}

//clear the stars:
let starsss = document.querySelectorAll('#star1') 

for(let i=0; i < starsss.length; i++) {
  starsss[i].checked = false;
  //chang ebody.style to white?
}

})


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

const checkRating = (a, b) => {
  let points;
  if (a <= b) {
    points = b + 4
  } else {
    points = 0
  }
  return points;
};

const checkRange = (userValue, barValue) => {
  if (barValue != 0) {
    points = -Math.abs(barValue - userValue) + 9;
  } else {
    points = 0;
  }
  return points
};
const checkImportance = (userValue, barValue) => {
    let points
    if (userValue <= barValue) {
        points = barValue;
    } else {
        points = 0
    }
    return points
}

const compareAndDisplay = (filterValues, barResults) => {
  barResults.forEach((barResult) => {
    rating = checkRating(filterValues.rating, barResult.rating),
    crowd = checkRange(filterValues.crowd, barResult.crowd),
    hygiene = checkImportance(filterValues.hygiene, barResult.hygiene),
    atmosphere = checkRange(filterValues.atmosphere, barResult.atmosphere),
    safety =  checkImportance(filterValues.safety, barResult.safety)
    let match = (rating+crowd+hygiene+atmosphere+safety)
    barCards.forEach(barCard => {
        if (barCard.id === barResult.id) {
            barCard.dataset.match = match
        }
    })
  });
  let newOrder = Array.from(barCards)
  newOrder.sort((a,b) => parseInt(b.dataset.match) - parseInt(a.dataset.match))
  newOrder.forEach(newOrderCard => {
      resultsContainer.appendChild(newOrderCard)
  })
};

if (applyFilter != undefined) {
  applyFilter.addEventListener("click", async (e) => {
    e.preventDefault();
    let filterValues = getFilterValues();
    let barResults = getResults();
    compareAndDisplay(filterValues, barResults);
    searchContainer.style.display = "flex";
    filterByContainer.style.display = "flex";
    filterContainer.style.display = "none";
    resultsContainer.style.display = "flex";
    body.style.backgroundColor = "#4d194d";
    setTheLogoWhite.style.display = "flex";
    setTheLogoPurple.style.display = "none";
  });
}

UpdateProfileButton.addEventListener('click', () => {
  if(updateWindow.style.display == 'flex')
      updateWindow.style.display='none'
  else {
    updateWindow.style.display='flex'

  }    
})