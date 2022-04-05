const body = document.querySelector('body'),
searchInput = document.querySelector('.search-input'),
searchContainer = document.querySelector('.search-container'),
locationDiv = document.querySelector('.location-general-container'),
dashboardDiv = document.querySelector('.dashboard-container'),
setTitle = document.querySelector('.set-the-bar-title'),
setTheLogoWhite = document.querySelector('.set-the-logo-white'),
setTheLogoPurple = document.querySelector('.set-the-logo-purple'),
filterByBtn = document.querySelector('.filterby-btn'),
filterByContainer = document.querySelector('.filterby-container'),
filterContainer = document.querySelector('.filter-container'),
xBtn = document.querySelector('.x')


if (searchInput != undefined) {
    
searchInput.addEventListener('focus',() => {
    locationDiv.style.display = 'flex'
    dashboardDiv.style.display = 'none'
})

searchInput.addEventListener('blur',() => {
    locationDiv.style.display = 'none'
    dashboardDiv.style.display = 'flex'
})
}

if (xBtn !== undefined) {
    xBtn.addEventListener('click',() => {
        searchContainer.style.display = 'flex'
        filterByContainer.style.display = 'flex'
        filterContainer.style.display = 'none'
        body.style.backgroundColor = '#4d194d'
        setTheLogoWhite.style.display = 'flex'
        setTheLogoPurple.style.display = 'none'
    })    
}

if (filterByBtn != undefined) {
    filterByBtn.addEventListener('click',() => {
        searchContainer.style.display = 'none'
        filterByContainer.style.display = 'none'
        filterContainer.style.display = 'flex'
        body.style.backgroundColor = 'whitesmoke'
        setTheLogoWhite.style.display = 'none'
        setTheLogoPurple.style.display = 'block'
    })
}
