import { fetchWeatherData } from '../services/weatherService.js';

export async function getWeather(req, res) {
    // Extract query parameters
    const {city} = req.query;

    // Check if city parameter is provided
    if (!city) {
        return res.status(400).json({ error: 'City parameter is required' });
    }

    // Fetch weather data using third-party service
    try {
        const weatherData = await fetchWeatherData(city);
        res.json(weatherData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
};