'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import Navbar from '../components/Navbar'

const difficultyColor = {
  Easy: 'bg-green-100 text-green-700',
  Moderate: 'bg-amber-100 text-amber-700',
  Hard: 'bg-stone-900 text-white',
}

const filters = ['All', 'Easy', 'Moderate', 'Hard']

export default function TrailsPage() {
  const [trails, setTrails] = useState([])
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState('All')

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('trails').select('*').order('created_at')
      setTrails(data || [])
      setLoading(false)
    }
    load()
  }, [])

  const filtered = active === 'All' ? trails : trails.filter(t => t.difficulty === active)

  return (
    <main className="bg-white text-stone-900 min-h-screen">

      <Navbar />

      <section className="px-6 md:px-12 max-w-6xl mx-auto pt-32">
        <h1 className="text-4xl md:text-5xl font-black">Hiking trails</h1>
        <p className="text-stone-500 mt-3 max-w-2xl">
          Explore Madeira's official PR trails. Booking is by 30-min time slot on the SIMplifica portal. Madeira residents, children under 12 and certified disabilities are exempt.
        </p>

        <div className="flex gap-2 mt-8 flex-wrap">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(trail => (
              <a key={trail.id} href={'/trails/' + trail.slug} className="group rounded-3xl overflow-hidden border border-stone-100 hover:shadow-xl transition">
                <div className="h-56 overflow-hidden">
                  <img src={trail.image_url} alt={trail.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-lg leading-snug">{trail.code} – {trail.name}</h3>
                    <span className={'text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap ' + (difficultyColor[trail.difficulty] || 'bg-stone-100 text-stone-700')}>{trail.difficulty}</span>
                  </div>
                  <div className="flex gap-4 text-sm text-stone-500 mt-3">
                    <span>⛰ {trail.distance}</span>
                    <span>🕑 {trail.duration}</span>
                    <span>↗ {trail.elevation}</span>
                  </div>
                  <p className="font-bold text-lg mt-3">€{trail.price_eur}<span className="text-stone-400 text-sm font-normal">/p</span></p>
                </div>
              </a>
            ))}
          </div>
        )}
      </section>

    </main>
  )
}