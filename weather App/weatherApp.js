const weatherform = document.querySelector(".weatherform");
const cityInput = document.querySelector(".input");
const card = document.querySelector(".card");
const apikey = "601354261adcebf4a61b1c365ff266c9";

weatherform.addEventListener("submit", async event => {
    event.preventDefault();

    const city = cityInput.value;

    if (city) {
        try {
            const weatherdata = await getWeatherData(city);
            displayWeatherInfo(weatherdata);

        } catch (error) {
            console.error(error);
            displayError(error.message);
        }
    } else {
        displayError("Please Enter A City!");
    }
});

async function getWeatherData(city) {
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const response = await fetch(apiURL);
    console.log(response);

    if (!response.ok) {
        throw new Error("Could Not Fetch Weather Data!");
    }
    return await response.json();
}

function displayWeatherInfo(data) {
    const { name: city, main: { temp, humidity }, weather: [{ description, id }] } = data;

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const humidityIcon = document.createElement("img");  
    const desDisplay = document.createElement("p");
    const imgDisplay = document.createElement("img"); 

    cityDisplay.textContent = city;
    tempDisplay.textContent = `Temperature : ${(temp - 273.15).toFixed(1)} °C`;
    humidityDisplay.textContent = `Humidity : ${humidity}%`; 
    humidityIcon.src = 'images/humidity.png';  

    desDisplay.textContent = description;
    imgDisplay.src = displayWeatherImg(id);  

    humidityDisplay.classList.add("humidityDisplay");
    humidityIcon.classList.add("humidityIcon");  
    tempDisplay.classList.add("tempDisplay");
    cityDisplay.classList.add("cityDisplay");
    desDisplay.classList.add("description");
    imgDisplay.classList.add("imgDisplay");


    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityIcon);
    card.appendChild(humidityDisplay);
    card.appendChild(desDisplay);
    card.appendChild(imgDisplay);

}

function displayWeatherImg(weatherId) {
    if (weatherId >= 200 && weatherId < 300) {
        return 'images/thunder.png'; 
    } else if (weatherId >= 300 && weatherId < 400) {
        return 'images/drizzle.png';  
    } else if (weatherId >= 500 && weatherId < 600) {
        return 'images/rain.png'; 
    } else if (weatherId >= 600 && weatherId < 700) {
        return 'images/snow.png'; 
    } else if (weatherId >= 700 && weatherId < 800) {
        return 'images/mist.png'; 
    } else if (weatherId === 800) {
        return 'images/clear.png'; 
    } else if (weatherId >= 801 && weatherId < 810) {
        return 'images/clouds.png'; 
    }
    return 'images/default.png';  
}

function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}
