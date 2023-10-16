const apiKey = "25644103878aa38a3e710b3f92e347ea";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");


/*let time = document.getElementById("time");
setInterval(()=>{
    let d = new Date();
    time.innerHTML = d.toLocaleTimeString;
}, 1000)*/

//display weather infos 
async function checkWeather(city){

    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(response.status === 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        var data = await response.json(); //info from weather

        //display data 
        document.querySelector(".city").innerHTML = data.name; // On récupère les data
        document.querySelector(".temp").innerHTML =Math.floor( data.main.temp) + "°C";
        document.querySelector(".feels-like").innerHTML = "Feels like " + Math.floor( data.main.feels_like) + "°C" + " | " + data.weather[0].description;;
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%"; 
        document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + " km/h";
        document.querySelector(".sunrise").innerHTML =  timeConverter(data.sys.sunrise,data.timezone ) + "<br/> Sunrise ";
        document.querySelector(".sunset").innerHTML = timeConverter(data.sys.sunset,data.timezone) + "<br/> Sunset ";

        //get weather type and changing background color according to the weather
        let weatherType = (data.weather[0].main ).toLowerCase();
        weatherIcon.src = `assets/images/${weatherType}.png` ;

        const currentTime = new Date().getTime() / 1000; // Current time in UNIX timestamp
        
        const isDay = currentTime > data.sys.sunrise && currentTime < data.sys.sunset;
        document.querySelector(".current-time").innerHTML = getDayName(currentTime,data.timezone,'en-US') +" "+ timeConverter(currentTime,data.timezone);

        const cardElement = document.querySelector(".card");
        cardElement.classList.toggle('night', !isDay);

        if(isDay===true) {
        cardElement.classList.remove("clear", "clouds", "drizzle", "rain", "mist", "snow"); // Supprime les classes précédentes
        cardElement.classList.add(weatherType);
        weatherIcon.style.removeProperty("width"); // Reset size
        weatherIcon.style.removeProperty("height");
        }else{
            weatherIcon.style.width = "120px"; // Adjust the width 
            weatherIcon.style.height = "120px";
            weatherIcon.src="assets/images/night.svg";
        }
    
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }

    
    
}

searchBtn.addEventListener("click", ()=> {
    
    checkWeather(searchBox.value);

})

/*function timeConverter(UNIX_timestamp, timeZoneOffset) {
    const date = new Date(UNIX_timestamp * 1000); // Convert UNIX timestamp to milliseconds
    const offsetHours = timeZoneOffset / 3600; // Convert offset to hours
    date.setHours(date.getHours() + offsetHours); // Adjust hours based on the offset
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return date.toLocaleTimeString('en-US', options);
    
}*/


function timeConverter(UNIX_timestamp, timeZoneOffset) {
    const date = new Date(UNIX_timestamp * 1000); // Convert UNIX timestamp to milliseconds

    // Adjust the date by adding the offset (in milliseconds)
    const adjustedDate = new Date(date.getTime() + timeZoneOffset * 1000);
    console.log(adjustedDate);
    const hour = ('0' + adjustedDate.getUTCHours()).slice(-2);
    const minute = ('0' + adjustedDate.getUTCMinutes()).slice(-2);
    
    return `${hour}:${minute}`;
}

function getDayName(UNIX_timestamp, timeZoneOffset, locale)
{
    const date = new Date(UNIX_timestamp * 1000);
   
    const adjustedDate = new Date(date.getTime() + timeZoneOffset * 1000);
    
    //get the weekday
    return adjustedDate.toLocaleDateString(locale, { weekday: 'long' });        
}


checkWeather("Belfort");
