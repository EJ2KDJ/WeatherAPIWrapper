import axios from 'axios';
import { getCache, setCache } from '../utils/cache.js';
import dotenv from 'dotenv';

dotenv.config();

export async function fetchWeatherData(city) {
    try {
        // lowercase city name to maintain consistency in cache keys
        const key = city.toLowerCase();

        // Check if data is in cache
        const cached = await getCache(key);
        // Return cached data if available
        if (cached) {
            console.log(`✅ Cache hit for: ${city}`);
            return JSON.parse(cached);
        }

        console.log(`🔍 Fetching from API for: ${city}`);
        
        // If not in cache, fetch from third-party API
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${process.env.API_KEY}`;
        console.log('API URL:', url.replace(process.env.API_KEY, '***')); // Hide API key in logs
        
        const response = await axios.get(url);
        const data = response.data;

        // Store fetched data in cache for 12 hour (43200 seconds)
        await setCache(key, JSON.stringify(data), 43200);
        console.log(`✅ Data cached for: ${city}`);

        return data;
    } catch (error) {
        console.error('❌ Weather API Error:', error.message);
        console.error('Status:', error.response?.status);
        console.error('Data:', error.response?.data);
        throw error;
    }
};