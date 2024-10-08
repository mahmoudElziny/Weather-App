// API KEY : eb0cdecefac34da08c581526240410

// Today variables
let todayName = document.getElementById("today_date_day_name");
let todayNumber = document.getElementById("today_date_day_number");
let todayMonth = document.getElementById("today_date_month");
let todayLocation = document.getElementById("today_location");
let todayTemp = document.getElementById("today_temp");
let todayConditionImg = document.getElementById("today_condition_img");
let todayConditionText = document.getElementById("today_condition_text");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let windDirecion = document.getElementById("wind_direction");
let weatherData;

// Next & After date variables
let nextDay = document.getElementsByClassName("next_day_name");
let nextMaxTemp = document.getElementsByClassName("next_max_temp");
let nextMinTemp = document.getElementsByClassName("next_min_temp");
let nextConditionImg = document.getElementsByClassName("next_condition_img");
let nextConditionText = document.getElementsByClassName("next_condition_text");

// Search input
let searchInput = document.getElementById("search");
let submitBtn = document.getElementById("submit");

//Language List
let languageList = document.getElementById("language"); 

let cityD = 'cairo';
let langD = languageList.value;

// Fetch API Data
async function getWeatherData(cityName, lang) {    
    let weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=eb0cdecefac34da08c581526240410&q=${cityName}&days=3&lang=${lang}`);
    let weatherDate = await weatherResponse.json();
    
    return weatherDate;
}

// display today data
function displayTodayData(weatherData) {
    let todayDate = new Date();

    todayName.innerHTML = todayDate.toLocaleString('default', { weekday: 'long' });
    todayNumber.innerHTML = todayDate.getDate();
    todayMonth.innerHTML = todayDate.toLocaleString('default', { month: 'long' });
    todayLocation.innerHTML = weatherData.location.name;
    todayTemp.innerHTML = weatherData.current.temp_c;
    todayConditionImg.setAttribute("src", weatherData.current.condition.icon);
    todayConditionText.innerHTML = weatherData.current.condition.text;
    humidity.innerHTML = weatherData.current.humidity + '%';
    wind.innerHTML = weatherData.current.wind_kph + 'km/h';
    windDirecion.innerHTML = weatherData.current.wind_dir;
}

// display next & after date data
function displayNextDateData(weatherData) {
    let forecastData = weatherData.forecast.forecastday;
    for(let i = 0; i < 2; i++) {
        let nextDate = new Date(forecastData[i+1].date);
        nextDay[i].innerHTML = nextDate.toLocaleString('default', { weekday: 'long' });
        nextMaxTemp[i].innerHTML = forecastData[i+1].day.maxtemp_c;
        nextMinTemp[i].innerHTML = forecastData[i+1].day.mintemp_c;
        nextConditionImg[i].setAttribute("src", forecastData[i+1].day.condition.icon);
        nextConditionText[i].innerHTML = forecastData[i+1].day.condition.text;
    }
}

// start app
async function startApp(city= cityD, lang= langD) {
    let weatherData = await getWeatherData(city, lang); 
    if(!weatherData.error){
        displayTodayData(weatherData);
        displayNextDateData(weatherData);
    }
    
}

startApp()

searchInput.addEventListener("input", (event) => {
    cityD = searchInput.value;
    startApp(searchInput.value);    
});

submitBtn.addEventListener("click", (event) => {
    cityD = searchInput.value;
    startApp(searchInput.value);
});

languageList.addEventListener("change", (event) => {    
    langD = languageList.value;
    startApp(cityD, langD);
});