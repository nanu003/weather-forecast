import { useState, useEffect } from "react"

function CityWeather({ onWeatherFetch, onAqiFetch, initialAqi, initialWeather }) {
    const [aqi, setAqi] = useState(initialAqi);
    const [weatherData, setWeatherData] = useState(initialWeather);
    const [searchCity, setSearchCity] = useState("");

  useEffect(() => {
    setAqi(initialAqi);
    setWeatherData(initialWeather);
  }, [initialAqi, initialWeather]);

  const getAqiStatus = (value) => {
    switch (value) {
      case 1: return "Good";
      case 2: return "Fair";
      case 3: return "Moderate";
      case 4: return "Poor";
      case 5: return "Very Poor";
      default: return "Unknown";
    }
  };

  const fetchCityWeather = async (city) => {
    if (!city.trim()) return;
    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=945ee1dd4413c03faf961753d6cd858d`);
      const data = await res.json();
      if (data.cod !== 200) {
        alert("City not found!");
        return;
      }
      setWeatherData(data);
      onWeatherFetch(data);
      const { lat, lon } = data.coord;
      const aqiRes = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=945ee1dd4413c03faf961753d6cd858d`);
      const aqiData = await aqiRes.json();
      setAqi(aqiData.list[0]);
      onAqiFetch(aqiData.list[0]);
    } catch (error) {
      console.log("Something went wrong!:", error);
    }
  };

  const aqiValue = aqi?.main?.aqi;

  return (
    <div className="w-full max-w-xl bg-white/80 backdrop-blur-sm rounded-xl p-6 md:p-8 lg:p-12 text-center shadow-xl min-h-[400px] md:min-h-[500px] lg:min-h-[600px]">
      <form onSubmit={(e) => { e.preventDefault(); fetchCityWeather(searchCity); }} className="mb-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            placeholder="Search city..."
            className="flex-1 px-3 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="px-4 py-2 text-sm md:text-base bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 whitespace-nowrap"
          >
            Search
          </button>
        </div>
      </form>
      {!aqi || !weatherData ? (
        <div className="flex-1 flex items-center justify-center min-h-[300px] md:min-h-[400px]">
          <p className="text-gray-400 text-base md:text-lg">Loading details...</p>
        </div>
      ) : (
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 mb-6 md:mb-8">📊 Weather Details</h2>

          <div className="space-y-4 md:space-y-6">
            <div className="bg-indigo-50 p-4 md:p-6 rounded-lg">
              <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-3 md:mb-4">🌡️ Conditions</h3>
              <div className="flex flex-col gap-2 md:gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm md:text-base lg:text-lg">Humidity:</span>
                  <span className="text-sm md:text-base lg:text-lg font-bold text-indigo-600">{weatherData.main.humidity}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm md:text-base lg:text-lg">Clouds:</span>
                  <span className="text-sm md:text-base lg:text-lg font-bold text-indigo-600">{weatherData.clouds.all}%</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 md:p-6 rounded-lg">
              <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-3 md:mb-4">💨 Air Quality</h3>
              <div className="flex flex-col gap-2 md:gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm md:text-base lg:text-lg">AQI Value:</span>
                  <span className="text-sm md:text-base lg:text-lg font-bold text-yellow-600">{aqiValue}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm md:text-base lg:text-lg">Status:</span>
                  <span className="text-sm md:text-base lg:text-lg font-bold text-yellow-600">{getAqiStatus(aqiValue)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CityWeather