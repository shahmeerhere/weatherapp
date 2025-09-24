"use server"


const checkWeather = async (city) => {
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6b19e32dc4296925603e03dc358526f9&units=metric`);  
  let data = await res.json();
  return data;
};

export default checkWeather;