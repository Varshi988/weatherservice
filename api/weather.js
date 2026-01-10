export default async function handler(req, res) {
  const city = req.query.city;

  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }

  const API_KEY = process.env.WEATHERBIT_API_KEY;

  try {
    const response = await fetch(
      `https://api.weatherbit.io/v2.0/current?city=${encodeURIComponent(city)}&key=${API_KEY}`
    );

    if (!response.ok) {
      return res.status(500).json({ error: "Weatherbit API error" });
    }

    const data = await response.json();
    const weather = data.data[0];

    res.status(200).json({
      city: weather.city_name,
      country: weather.country_code,
      temperature: weather.temp,
      condition: weather.weather.description,
      humidity: weather.rh,
      wind: weather.wind_spd,
      icon: weather.weather.icon
    });

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
}
