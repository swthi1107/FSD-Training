const apiKey = "441bef0c858cdd3d384862ebc1556830";

async function getWeather() {
    const city = document.getElementById("city").value;

    if (!city) {
        alert("Please enter a city name");
        return;
    }

    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === "404") {
            alert("City not found");
            return;
        }

        document.getElementById("cityName").innerText =
            `${data.name}, ${data.sys.country}`;

        document.getElementById("temp").innerText =
            `${Math.round(data.main.temp)}°C`;

        document.getElementById("condition").innerText =
            data.weather[0].description;

        document.getElementById("humidity").innerText =
            `${data.main.humidity}%`;

        document.getElementById("wind").innerText =
            `${data.wind.speed} m/s`;

    } catch (error) {
        alert("Error fetching weather data");
        console.error(error);
    }
}