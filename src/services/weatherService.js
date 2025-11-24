import axios from 'axios';
import { getCache, setCache } from '../utils/cache.js';
import dotenv from 'dotenv';

dotenv.config();

export async function fetchWeatherData(city) {

    // lowercase city name to maintain consistency in cache keys
    const key = city.toLowerCase();

    // Check if data is in cache
    const cached = await getCache(key);
    // Return cached data if available
    if (cached) return JSON.parse(cached);

    // If not in cache, fetch from third-party API
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${process.env.WEATHER_API_KEY}`;
    const response = await axios.get(url);
    const data = response.data;

    // Store fetched data in cache for 12 hour (43200 seconds)
    await setCache(key, JSON.stringify(data), 43200);

    return data;
};