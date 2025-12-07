import Front from "./components/Front"
import CityWeather from "./components/CityWeather"
import { useState, useEffect } from "react"

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [aqiData, setAqiData] = useState(null);

  useEffect(() => {
    const fetchCurrentLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;

          try {
            const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=945ee1dd4413c03faf961753d6cd858d`);
            const weatherData = await weatherRes.json();
            setWeatherData(weatherData);

            const aqiRes = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=945ee1dd4413c03faf961753d6cd858d`);
            const aqiDataResult = await aqiRes.json();
            setAqiData(aqiDataResult.list[0]);
          } catch (error) {
            console.error("Error fetching location weather:", error);
          }
        }, (err) => {
          console.error("Error getting location:", err);
        });
      }
    };

    fetchCurrentLocation();
  }, []);
    
  return (
    <div className="relative h-screen flex items-center justify-center gap-8 p-8">
      <h1 className="absolute top-4 left-1/2 -translate-x-1/2 text-3xl font-bold text-black drop-shadow-lg text-center z-10">AuraWeather</h1>
      <Front weatherData={weatherData} />
      <CityWeather onWeatherFetch={setWeatherData} onAqiFetch={setAqiData} initialAqi={aqiData} initialWeather={weatherData} />
    </div>
  )
}

export default App