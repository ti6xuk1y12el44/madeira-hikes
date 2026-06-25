'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const difficultyColor = {
  Easy: 'bg-green-100 text-green-700',
  Moderate: 'bg-amber-100 text-amber-700',
  Hard: 'bg-stone-900 text-white',
}

const filters = ['All', 'Easy', 'Moderate', 'Hard']
const islands = ['Madeira', 'Porto Santo']

export default function PermitsPage() {
  const [trails, setTrails] = useState([])
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState('All')
  const [island, setIsland] = useState('Madeira')

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('trails').select('*').order('code')
      setTrails(data || [])
      setLoading(false)
    }
    load()
  }, [])

  const islandTrails = trails.filter(t => (t.island || 'Madeira') === island)
  const filtered = active === 'All' ? islandTrails : islandTrails.filter(t => t.difficulty === active)

  function simplificaUrl(trail) {
    return 'https://simplifica.madeira.gov.pt/services/78-82-259?trail=' + encodeURIComponent(trail.code + ' – ' + trail.name)
  }

  return (
    <main className="bg-white text-stone-900 min-h-screen">
      <Navbar solid={true} />

      <section className="px-6 md:px-12 max-w-6xl mx-auto pt-32">
        <h1 className="text-4xl md:text-5xl font-black">Hiking permits</h1>
        <p className="text-stone-500 mt-3 max-w-3xl">
          Access to classified PR trails requires a permit booked by 30-minute time slot on the official SIMplifica portal. The fee is generally €4.50 per person (€10.50 on PR1). Madeira residents, children under 12 and certified disabilities are exempt.
        </p>

        {/* Info card */}
        <div className="mt-8 bg-stone-900 text-white rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="flex-1">
            <h2 className="text-xl font-black">How booking works</h2>
            <p className="text-stone-300 mt-2 max-w-xl">Pick your trail below, choose a date and time slot on SIMplifica, pay the fee, and bring your confirmation. Booking opens a few days ahead.</p>
          </div>
          <a href="https://simplifica.madeira.gov.pt" target="_blank" rel="noopener noreferrer" className="bg-white text-stone-900 px-6 py-3 rounded-full font-semibold hover:bg-stone-100 transition whitespace-nowrap">
            Open SIMplifica →
          </a>
        </div>

        {/* Toggle ilha */}
        <div className="inline-flex bg-stone-100 rounded-full p-1 mt-8">
          {islands.map(isl => (
            <button
              key={isl}
              onClick={() => setIsland(isl)}
              className={
                'px-6 py-2 rounded-full font-semibold transition ' +
                (island === isl ? 'bg-stone-900 text-white' : 'text-stone-600 hover:text-stone-900')
              }
            >
              {isl}
            </button>
          ))}
        </div>

        {/* Filtros dificuldade */}
        <div className="flex gap-2 mt-4 flex-wrap">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={
                'px-5 py-2 rounded-full font-medium transition ' +
                (active === f ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-700 hover:bg-stone-200')
              }
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-12 max-w-6xl mx-auto mt-10 pb-24">
        {loading ? (
          <p className="text-stone-400">Loading trails...</p>
        ) : filtered.length === 0 ? (
          <p className="text-stone-400">No trails match this filter.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map(trail => (
              <div key={trail.id} className="rounded-3xl overflow-hidden border border-stone-100 hover:shadow-xl transition flex flex-col">
                <a href={'/trails/' + trail.slug} className="block h-48 overflow-hidden group">
                  <img src={trail.image_url} alt={trail.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                </a>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-lg leading-snug">{trail.code} – {trail.name}</h3>
                    <span className={'text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap ' + (difficultyColor[trail.difficulty] || 'bg-stone-100 text-stone-700')}>{trail.difficulty}</span>
                  </div>
                  <div className="flex gap-4 text-sm text-stone-500 mt-3">
                    <span>⛰ {trail.distance}</span>
                    <span>🕑 {trail.duration}</span>
                  </div>
                  <div className="flex items-center justify-between mt-5 pt-4 border-t border-stone-100">
                    <p className="font-black text-lg">€{trail.price_eur}<span className="text-stone-400 text-sm font-normal">/person</span></p>
                    <a href={simplificaUrl(trail)} target="_blank" rel="noopener noreferrer" className="bg-stone-900 text-white px-5 py-2 rounded-full font-semibold text-sm hover:bg-stone-800 transition">
                      Book permit ↗
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </main>
  )
}