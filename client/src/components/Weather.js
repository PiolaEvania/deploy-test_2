import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherData(latitude, longitude);
      },
      (error) => {
        toast.error('Tidak dapat mengakses lokasi.');
        setLoading(false);
      }
    );
  }, []);

  const fetchWeatherData = async (latitude, longitude) => {
    try {
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
      );
      setWeatherData(response.data);
    } catch (error) {
      toast.error('Gagal mengambil data cuaca.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className='ml-2 text-white'>Loading cuaca...</div>;

  if (!weatherData) return <div>Cuaca tidak tersedia.</div>;

  const { main, weather, name } = weatherData;
  const weatherIcon = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  return (
    <div className="flex items-center space-x-4 text-white flex-wrap">
      <img
        src={weatherIcon}
        alt={weather[0].description}
        className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20"
      />
      <div className="text-center sm:text-left">
        <h2 className="text-sm sm:text-lg font-bold">{name}</h2>
        <p className="text-xs sm:text-sm">{weather[0].description}</p>
        <p className="text-xs sm:text-sm">{main.temp}°C</p>
      </div>
    </div>
  );
};

export default Weather;
