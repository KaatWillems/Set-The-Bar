const searchBar = document.querySelector('.set-the-bar-search-bar'),
locationDiv = document.querySelector('.location-general-container'),
dashboardDiv = document.querySelector('.dashboard-container'),
setTitle = document.querySelector('.set-the-bar-title')

searchBar.addEventListener('click',() => {
    locationDiv.style.display = 'flex'
    dashboardDiv.style.display = 'none'
})

