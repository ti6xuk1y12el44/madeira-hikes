'use client'

import { useState, useEffect } from 'react'

const FUNCHAL = { lat: 32.6669, lon: -16.9241 }

const weatherText = {
  0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
  45: 'Foggy', 48: 'Foggy',
  51: 'Light drizzle', 53: 'Drizzle', 55: 'Drizzle',
  61: 'Light rain', 63: 'Rain', 65: 'Heavy rain',
  71: 'Light snow', 73: 'Snow', 75: 'Heavy snow',
  80: 'Showers', 81: 'Showers', 82: 'Heavy showers',
  95: 'Thunderstorm', 96: 'Thunderstorm', 99: 'Thunderstorm',
}

const weatherIcons = {
  0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️',
  45: '🌫️', 48: '🌫️',
  51: '🌦️', 53: '🌦️', 55: '🌦️',
  61: '🌧️', 63: '🌧️', 65: '🌧️',
  71: '🌨️', 73: '🌨️', 75: '🌨️',
  80: '🌦️', 81: '🌧️', 82: '⛈️',
  95: '⛈️', 96: '⛈️', 99: '⛈️',
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${FUNCHAL.lat}&longitude=${FUNCHAL.lon}&current=temperature_2m,weather_code&timezone=auto`
        const res = await fetch(url)
        const data = await res.json()
        setWeather(data.current)
      } catch (e) {
        setWeather(null)
      }
    }
    load()
  }, [])

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-stone-100 px-8 py-6 flex items-center justify-between">
      <div>
        <p className="font-bold text-lg">Funchal</p>
        <p className="text-stone-500 text-sm">
          {weather ? (weatherText[weather.weather_code] || 'Current conditions') : 'Loading...'}
        </p>
      </div>
      <p className="text-4xl">{weather ? (weatherIcons[weather.weather_code] || '🌡️') : ''}</p>
      <p className="text-4xl font-black">
        {weather ? Math.round(weather.temperature_2m) + '°C' : '—'}
      </p>
      <span className="text-xs font-semibold border border-stone-200 rounded-full px-3 py-1">⚡ Live</span>
    </div>
  )
}