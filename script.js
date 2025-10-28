const apiKey = "a53168a13a4b4418a72f5da2a99e11b3";

document.getElementById("searchBtn").addEventListener("click", async () => {
  const city = document.getElementById("cityInput").value.trim();
  const weatherInfo = document.getElementById("weatherInfo");

  if (city === "") {
    weatherInfo.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  weatherInfo.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch(
      `https://api.weatherbit.io/v2.0/current?city=${encodeURIComponent(city)}&key=${apiKey}&include=minutely`
    );

    if (!response.ok) {
      throw new Error("Unable to reach Weatherbit API");
    }

    const data = await response.json();

    // Check if valid data exists
    if (!data.data || data.data.length === 0) {
      throw new Error("City not found. Please check spelling.");
    }

    const weather = data.data[0];
    const iconUrl = `https://www.weatherbit.io/static/img/icons/${weather.weather.icon}.png`;

    weatherInfo.innerHTML = `
      <h2>${weather.city_name}, ${weather.country_code}</h2>
      <img src="${iconUrl}" alt="${weather.weather.description}" width="100" height="100">
      <p>🌡 Temperature: ${weather.temp} °C</p>
      <p>🌤 Condition: ${weather.weather.description}</p>
      <p>💧 Humidity: ${weather.rh}%</p>
      <p>💨 Wind Speed: ${weather.wind_spd} m/s</p>
    `;
  } catch (error) {
    weatherInfo.innerHTML = `<p style="color: #ffb3b3;">Error: ${error.message}</p>`;
    console.error(error);
  }
});
