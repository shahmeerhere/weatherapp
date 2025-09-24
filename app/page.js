"use client"
import { IoMdSearch } from "react-icons/io";
import checkWeather from "./script";
import { useRef, useState, useEffect } from "react";
import { FaSun, FaCloud, FaCloudRain, FaSnowflake } from "react-icons/fa";

export default function Home() {
  const formRef = useRef();
  const [weatherData, setWeatherData] = useState(null);
  const [sunProgress, setSunProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("");
  const [bgClass, setBgClass] = useState("bg-gradient-to-br from-gray-800 via-gray-900 to-black");
  const [weatherIcon, setWeatherIcon] = useState(<FaSun className="text-yellow-400" />);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const city = formData.get("city");
    const data = await checkWeather(city);

    const temp = Math.round(data.main.temp);
    const description = data.weather[0].main.toLowerCase();
    const nowUnix = Date.now() / 1000;
    const sunrise = data.sys.sunrise;
    const sunset = data.sys.sunset;

    // Determine day/night
    const isDay = nowUnix >= sunrise && nowUnix <= sunset;

    // Determine background class
    let newBg = "";
    if (description.includes("cloud")) newBg = isDay 
        ? "bg-gradient-to-br from-gray-400 via-gray-500 to-gray-700" 
        : "bg-gradient-to-br from-gray-800 via-gray-900 to-black";
    else if (description.includes("rain") || description.includes("drizzle")) newBg = isDay 
        ? "bg-gradient-to-br from-blue-600 via-blue-700 to-gray-800" 
        : "bg-gradient-to-br from-blue-900 via-gray-900 to-black";
    else if (description.includes("snow")) newBg = isDay 
        ? "bg-gradient-to-br from-blue-200 via-gray-300 to-gray-400" 
        : "bg-gradient-to-br from-gray-600 via-gray-700 to-gray-900";
    else if (description.includes("clear")) newBg = isDay 
        ? temp <= 10 
          ? "bg-gradient-to-br from-blue-400 via-blue-500 to-gray-800"
          : temp <= 25
            ? "bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500"
            : "bg-gradient-to-br from-red-400 via-orange-500 to-yellow-500"
        : "bg-gradient-to-br from-gray-800 via-gray-900 to-black";
    else newBg = "bg-gradient-to-br from-gray-800 via-gray-900 to-black";

    setBgClass(newBg);

    // Determine weather icon
    if (description.includes("cloud")) setWeatherIcon(<FaCloud className="text-gray-300 text-6xl md:text-8xl" />);
    else if (description.includes("rain") || description.includes("drizzle")) setWeatherIcon(<FaCloudRain className="text-blue-400 text-6xl md:text-8xl" />);
    else if (description.includes("snow")) setWeatherIcon(<FaSnowflake className="text-blue-100 text-6xl md:text-8xl" />);
    else setWeatherIcon(<FaSun className="text-yellow-400 text-6xl md:text-8xl" />);

    setWeatherData({
      temp,
      tempMin: Math.round(data.main.temp_min),
      feelsLike: Math.round(data.main.feels_like),
      pressure: data.main.pressure,
      visibility: data.visibility,
      sunrise,
      sunset,
      main: data.weather[0].main,
      description: data.weather[0].description,
      windSpeed: data.wind.speed,
      sealevel: data.main.sea_level,
      groundlevel: data.main.grnd_level,
      humidity: data.main.humidity
    });

    formRef.current.reset();
  }

  // Sun Progress
  useEffect(() => {
    if (!weatherData) return;

    const updateSunProgress = () => {
      const now = Date.now() / 1000;
      const { sunrise, sunset } = weatherData;
      const totalDay = sunset - sunrise;
      const elapsed = Math.max(0, Math.min(now - sunrise, totalDay));
      const percent = (elapsed / totalDay) * 100;
      setSunProgress(percent);
    };

    updateSunProgress();
    const interval = setInterval(updateSunProgress, 60000);
    return () => clearInterval(interval);
  }, [weatherData]);

  // Current time updater
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setCurrentTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (unix) => {
    const date = new Date(unix * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`min-h-screen p-6 font-serif transition-all duration-1000 ${bgClass} text-gray-100`}>

      {/* Search Form */}
      <form ref={formRef} onSubmit={handleSubmit} className="flex justify-center items-center mb-10">
        <input
          type="search"
          name="city"
          placeholder="Enter City Name"
          required
          className="bg-white/10 placeholder-gray-400 w-full md:w-[40vw] p-3 rounded-xl text-gray-100 outline-none backdrop-blur-sm shadow-sm focus:ring-1 focus:ring-gray-400 transition-all"
        />
        <button
          type="submit"
          className="bg-gray-700 text-gray-100 font-light rounded-xl p-3 mx-2 shadow hover:bg-gray-600 transition-colors"
        >
          <IoMdSearch />
        </button>
      </form>

      {weatherData && (
        <div className="mt-6 flex flex-col items-center space-y-8">

          {/* Main Weather + Icon */}
          <div className="flex flex-col items-center gap-3">
            {weatherIcon}
            <h1 className="text-6xl md:text-8xl font-bold">{weatherData.temp} <sup className="text-2xl md:text-3xl">°C</sup></h1>
            <h3 className="text-2xl md:text-4xl font-light capitalize">{weatherData.description}</h3>

            {/* Current Time below temperature */}
            <span className="mt-2 text-lg md:text-xl font-mono bg-white/10 backdrop-blur-sm px-4 py-1 rounded-xl shadow-sm">
              {currentTime}
            </span>
          </div>

          {/* Feels Like / Min */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 text-gray-200 shadow-md w-fit mx-auto flex flex-col items-center space-y-1">
            <p>Feels Like: <span className="font-semibold">{weatherData.feelsLike}</span></p>
            <p>Min Temp: <span className="font-semibold">{weatherData.tempMin}</span></p>
          </div>

          {/* Sun Progress */}
          <div className="w-full max-w-xl mx-auto">
            <div className="relative w-full h-3 bg-yellow-900/20 rounded-full shadow-inner">
              <div
                className="absolute h-3 bg-yellow-500 rounded-full top-0 left-0 transition-all duration-500"
                style={{ width: `${sunProgress}%` }}
              ></div>
              <FaSun
                className="absolute -top-4 text-yellow-400 shadow-lg transition-all duration-500"
                style={{ left: `${sunProgress}%` }}
              />
            </div>
            <div className="flex justify-between text-sm mt-2 text-gray-300">
              <div className="flex flex-col items-start">
                <span>Sunrise</span>
                <span className="font-semibold">{formatTime(weatherData.sunrise)}</span>
              </div>
              <div className="flex flex-col items-end">
                <span>Sunset</span>
                <span className="font-semibold">{formatTime(weatherData.sunset)}</span>
              </div>
            </div>
          </div>

          {/* Weather Stats Grid */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-6 gap-6 w-full max-w-6xl">
            {[
              { label: "Wind Speed", value: `${weatherData.windSpeed} km/h` },
              { label: "Pressure", value: `${weatherData.pressure} mb` },
              { label: "Visibility", value: `${weatherData.visibility} m` },
              { label: "Humidity", value: `${weatherData.humidity}%` },
              { label: "Ground Level", value: `${weatherData.groundlevel} hPa` },
              { label: "Sea Level", value: `${weatherData.sealevel} hPa` }
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 flex flex-col items-center justify-center shadow-md hover:shadow-lg transition-shadow"
              >
                <p className="font-serif text-lg text-gray-300">{item.label}</p>
                <p className="font-serif text-2xl font-semibold text-gray-100 mt-1">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
