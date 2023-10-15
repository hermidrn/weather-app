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
        document.querySelector(".feels-like").innerHTML = "Feels like " + Math.floor( data.main.feels_like) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%"; 
        document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + " km/h";

        //get weather type and changing background color according to the weather
        let weatherType = (data.weather[0].main).toLowerCase();
        weatherIcon.src = `assets/images/${weatherType}.png`;

        const cardElement = document.querySelector(".card");
        cardElement.classList.remove("clear", "clouds", "drizzle", "rain", "mist", "snow"); // Supprime les classes précédentes
        cardElement.classList.add(weatherType);
    
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
    
}

searchBtn.addEventListener("click", ()=> {
    
    checkWeather(searchBox.value);

})
checkWeather("belfort");
