import React, { useEffect, useState } from "react";

const Front = ({ weatherData }) => {
  const kToC = (k) => (k - 273.15).toFixed(1);
  const cToF = (c) => ((c * 9) / 5 + 32).toFixed(1);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!weatherData) return (
    <div className="max-w-xl bg-white/80 backdrop-blur-sm rounded-xl p-12 text-center shadow-xl min-h-[600px] flex items-center justify-center">
      <p className="text-lg text-gray-400">Search a city to see weather</p>
    </div>
  );

  const tempC = kToC(weatherData.main.temp);
  const tempF = cToF(tempC);
  const city = weatherData.name;
  const todayDate = now.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const todayTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <div className="max-w-xl bg-white/80 backdrop-blur-sm rounded-xl p-12 text-center shadow-xl min-h-[600px]">
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">🌤️ Weather in</h2>
      <div className="text-3xl sm:text-4xl font-extrabold mt-2 text-gray-900">{city}</div>

      <div className="mt-8">
        <div className="text-5xl sm:text-6xl font-extrabold leading-none text-indigo-600">{tempC}°C</div>
        <div className="text-lg text-gray-600 mt-1">/ {tempF}°F</div>
      </div>
        <div className="px-3 rounded-lg text-4xl font-medium mr-57 mt-50"><span className="font-bold">{todayTime}</span></div>
        <br/>
        <div className="px-3  rounded-lg text-lg font-medium mr-50"><span className="font-bold">{todayDate}</span></div>
        
    </div>
  );
};

export default Front;
