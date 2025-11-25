# Weather API Wrapper Service

A simple backend (No UI) service that fetches weather data from a third-party API and uses Redis caching to improve speed and reduce repeated requests.

Project is from **Roadmap.sh**

---

## Features
- Fetch weather data from **Visual Crossing API**
- Caches results in Redis using city name as the key
- Cached data expires in **12 hours**
- Modular structure (practicing clean architecture even for small projects)
- `.env` to hide important credentials

---

## How It Works
1. User sends a request:  
   `GET /weather?city=Manila`
2. Server checks Redis to see if the city's data is cached
3. If **not cached**, the server fetches data from the third-party API
4. The response is saved to Redis with a **12-hour expiration**
5. Server returns the data to the user

---

## What I Learned
- Integrating API keys from third-party services  
- Implementing caching to improve performance  
- Properly utilizing environment variables  
