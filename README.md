# 🌦️ Weather App

> A responsive, real-time weather app built with Next.js and Tailwind CSS — powered by OpenWeatherMap API.

---

## 🚀 Overview

The **Weather App** provides live, city-based weather updates using the **OpenWeatherMap API**.
Simply enter your city name, and get accurate, real-time environmental stats — presented in a modern, minimalist UI built with **React**, **Next.js**, and **Tailwind CSS**.

---

## 🧠 Features

✅ Real-time weather data (API powered)
✅ City-based search
✅ Current, minimum, and “feels like” temperature
✅ Weather condition (e.g. haze, rain, clear sky)
✅ Live clock synced with GMT +5 (Islamabad Time)
✅ Sunrise and sunset timings
✅ Wind speed, humidity, visibility, pressure levels
✅ Ground level and sea level readings
✅ Fully responsive layout
✅ Optimized for fast loads & clean presentation

---

## 🛠️ Tech Stack

| Category        | Tech Used                       |
| --------------- | ------------------------------- |
| Framework       | **Next.js (React)**             |
| Styling         | **Tailwind CSS**                |
| Weather Data    | **OpenWeatherMap API**          |
| Deployment      | **Vercel**                      |
| Timezone & Date | **JavaScript Intl & Date APIs** |

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/weather-app.git
cd weather-app
```

Install dependencies:

```bash
npm install
```

Set up your environment variables in `.env.local`:

```bash
NEXT_PUBLIC_WEATHER_API_KEY=your_api_key_here
```

Run the app:

```bash
npm run dev
```

Open your browser and go to:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 📊 Rendered Data Fields

Each city search dynamically returns:

| Parameter                   | Example   | Description                |
| --------------------------- | --------- | -------------------------- |
| 🌆 **City Name**            | Islamabad | User-input city            |
| 🌡️ **Current Temperature** | 31°C      | Real-time city temperature |
| 🌤️ **Weather Condition**   | Haze      | Weather state              |
| 🤔 **Feels Like**           | 30°C      | Apparent temperature       |
| 🔻 **Min Temp**             | 31°C      | Minimum temperature        |
| 🌅 **Sunrise**              | 06:12     | Local sunrise time         |
| 🌇 **Sunset**               | 17:21     | Local sunset time          |
| 💨 **Wind Speed**           | 1.03 km/h | Wind velocity              |
| 🌫️ **Visibility**          | 4000 m    | Distance visible           |
| 💧 **Humidity**             | 33%       | Air moisture               |
| ⚖️ **Pressure**             | 1010 mb   | Atmospheric pressure       |
| 🧭 **Ground Level**         | 986 hPa   | Pressure at ground level   |
| 🌊 **Sea Level**            | 1010 hPa  | Pressure at sea level      |
| 🕓 **Local Time**           | 16:28:16  | GMT +5 synced clock        |

---

## 🖌️ UI & Responsiveness

Built entirely with **Tailwind CSS**, ensuring smooth layouts and elegant transitions across all screen sizes.

* Adaptive design for mobile, tablet, and desktop
* Minimalistic weather cards
* Real-time clock display
* Clear visual hierarchy and spacing

---

## 🌍 Deployment

Deployed on **Vercel**, providing lightning-fast global delivery and seamless CI/CD integration.

---

## ⚙️ Future Enhancements

* 🌈 Dark Mode Toggle
* 📍 Auto-location detection
* 📅 7-Day Forecast Extension
* 🌡️ Animated weather icons
* 💬 Voice-based city search

---

## 👨‍💻 Author

**Shahmeer Shahid**

> 💻 CS Student | Web Developer | Cybersecurity Enthusiast
> [Portfolio](https://shahmeershahid.vercel.app) • [LinkedIn](https://linkedin.com/in/shahmeershahid)

---

## 🪪 License

This project is licensed under the **MIT License**.
Feel free to use, modify, and share with credit.

---

Would you like me to add **GitHub badges + emojis for section titles (like tech stack badges, build status, and deployment link)** so it looks *super-polished for recruiters and clients*?
