const searchInput = document.querySelector('.search-input'),
locationDiv = document.querySelector('.location-general-container'),
dashboardDiv = document.querySelector('.dashboard-container'),
setTitle = document.querySelector('.set-the-bar-title')

searchInput.addEventListener('focus',() => {
    locationDiv.style.display = 'flex'
    dashboardDiv.style.display = 'none'
})

searchInput.addEventListener('blur',() => {
    locationDiv.style.display = 'none'
    dashboardDiv.style.display = 'flex'
})