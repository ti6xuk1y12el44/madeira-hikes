'use client'

import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'


// Coordenadas do Funchal
const FUNCHAL = { lat: 32.6669, lon: -16.9241 }

const weatherIcons = {
  0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️',
  45: '🌫️', 48: '🌫️',
  51: '🌦️', 53: '🌦️', 55: '🌦️',
  61: '🌧️', 63: '🌧️', 65: '🌧️',
  71: '🌨️', 73: '🌨️', 75: '🌨️',
  80: '🌦️', 81: '🌧️', 82: '⛈️',
  95: '⛈️', 96: '⛈️', 99: '⛈️',
}

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function WeatherPage() {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${FUNCHAL.lat}&longitude=${FUNCHAL.lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto&forecast_days=5`
        const res = await fetch(url)
        const data = await res.json()
        setWeather(data)
      } catch (e) {
        setError(true)
      }
      setLoading(false)
    }
    load()
  }, [])

  return (
    <main className="bg-white text-stone-900 min-h-screen">
      <Navbar solid={true} />

      <section className="px-6 md:px-12 max-w-5xl mx-auto pt-32 pb-24">
        <h1 className="text-4xl md:text-5xl font-black">Madeira weather</h1>
        <p className="text-stone-500 mt-3 max-w-2xl">
          Conditions change fast between the coast and the peaks. Always check before you hike.
        </p>

        {loading ? (
          <p className="text-stone-400 mt-10">Loading live weather...</p>
        ) : error ? (
          <p className="text-stone-400 mt-10">Could not load weather right now.</p>
        ) : (
          <>
          
            <div className="bg-stone-50 rounded-3xl border border-stone-100 px-8 py-6 flex items-center justify-between mt-10">
              <div>
                <p className="font-bold text-lg">Funchal</p>
                <p className="text-stone-500 text-sm">
                  💧 {weather.current.relative_humidity_2m}% · 💨 {weather.current.wind_speed_10m} km/h
                </p>
              </div>
              <p className="text-5xl">{weatherIcons[weather.current.weather_code] || '🌡️'}</p>
              <p className="text-5xl font-black">{Math.round(weather.current.temperature_2m)}°C</p>
            </div>

            <h2 className="text-2xl font-black mt-12">5-day outlook</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
              {weather.daily.time.map((date, i) => {
                const d = new Date(date)
                const label = i === 0 ? 'Today' : dayNames[d.getDay()]
                return (
                  <div key={date} className="border border-stone-100 rounded-2xl p-5 text-center">
                    <p className="font-semibold text-stone-600">{label}</p>
                    <p className="text-4xl my-3">{weatherIcons[weather.daily.weather_code[i]] || '🌡️'}</p>
                    <p className="font-bold">{Math.round(weather.daily.temperature_2m_max[i])}°</p>
                    <p className="text-stone-400 text-sm">{Math.round(weather.daily.temperature_2m_min[i])}°</p>
                  </div>
                )
              })}
            </div>

            <p className="text-stone-400 text-sm mt-6">Live data from Open-Meteo</p>
          </>
        )}
      </section>
      <Footer />
    </main>
  )
}