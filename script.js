document.getElementById("searchBtn").addEventListener("click", async () => {
  const city = document.getElementById("cityInput").value.trim();
  const weatherInfo = document.getElementById("weatherInfo");

  if (!city) {
    weatherInfo.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  weatherInfo.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    const iconUrl = `https://www.weatherbit.io/static/img/icons/${data.icon}.png`;

    weatherInfo.innerHTML = `
      <h2>${data.city}, ${data.country}</h2>
      <img src="${iconUrl}" alt="${data.condition}">
      <p>🌡 Temperature: ${data.temperature} °C</p>
      <p>🌤 Condition: ${data.condition}</p>
      <p>💧 Humidity: ${data.humidity}%</p>
      <p>💨 Wind Speed: ${data.wind} m/s</p>
    `;
  } catch (error) {
    weatherInfo.innerHTML = `<p>Error: ${error.message}</p>`;
  }
});
