'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const statusConfig = {
  open: { label: 'Open', dot: 'bg-green-500', badge: 'bg-green-100 text-green-700', count: 'text-green-600' },
  partial: { label: 'Partial', dot: 'bg-amber-500', badge: 'bg-amber-100 text-amber-700', count: 'text-amber-600' },
  closed: { label: 'Closed', dot: 'bg-rose-500', badge: 'bg-rose-100 text-rose-700', count: 'text-rose-600' },
}

const filters = ['All', 'Open', 'Partial', 'Closed']
const islands = ['Madeira', 'Porto Santo']

function timeAgo(dateStr) {
  if (!dateStr) return 'unknown'
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return mins + (mins === 1 ? ' minute ago' : ' minutes ago')
  const hours = Math.floor(mins / 60)
  if (hours < 24) return hours + (hours === 1 ? ' hour ago' : ' hours ago')
  const days = Math.floor(hours / 24)
  return days + (days === 1 ? ' day ago' : ' days ago')
}

export default function StatusPage() {
  const [trails, setTrails] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [active, setActive] = useState('All')
  const [search, setSearch] = useState('')
  const [island, setIsland] = useState('Madeira')
  const [lastUpdated, setLastUpdated] = useState(null)

  async function load(isRefresh = false) {
    if (isRefresh) setRefreshing(true)
    else setLoading(true)

    const { data } = await supabase.from('trails').select('*').order('code')
    setTrails(data || [])

    if (data && data.length) {
      const latest = data.map(t => t.status_updated_at).filter(Boolean).sort().pop()
      setLastUpdated(latest)
    }

    setLoading(false)
    setRefreshing(false)
  }

  useEffect(() => {
    load()
  }, [])

  // Trilhos da ilha selecionada
  const islandTrails = trails.filter(t => (t.island || 'Madeira') === island)

  const counts = {
    open: islandTrails.filter(t => t.status === 'open').length,
    partial: islandTrails.filter(t => t.status === 'partial').length,
    closed: islandTrails.filter(t => t.status === 'closed').length,
  }

  const filtered = islandTrails.filter(t => {
    const matchStatus = active === 'All' || t.status === active.toLowerCase()
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) || (t.code || '').toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchSearch
  })

  return (
    <main className="bg-white text-stone-900 min-h-screen">
      <Navbar solid={true} />

      <section className="px-6 md:px-12 max-w-6xl mx-auto pt-32 pb-20">

        <p className="text-stone-400 text-sm">Home → Trail status</p>
        <h1 className="text-4xl md:text-5xl font-black mt-2">Hiking Trails Status</h1>

        <div className="flex flex-wrap items-center gap-4 mt-3">
          <p className="text-stone-500">Real-time status of Madeira's official PR trails.</p>
          <span className="flex items-center gap-2 text-sm text-stone-400">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Updated {timeAgo(lastUpdated)}
          </span>
          <button
            onClick={() => load(true)}
            disabled={refreshing}
            className="text-sm font-semibold border border-stone-300 rounded-full px-4 py-1.5 hover:bg-stone-50 transition disabled:opacity-50"
          >
            {refreshing ? 'Refreshing...' : '↻ Refresh'}
          </button>
        </div>

        {/* BANNER DE AVISO */}
        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-4">
          <span className="text-2xl">⚠️</span>
          <div>
            <p className="font-bold text-amber-800 text-sm uppercase tracking-wide">PR1 Update · 1 June 2026</p>
            <p className="text-stone-800 font-semibold mt-1">Full route opens daily from 26 June — bookings available now on SIMplifica</p>
            <p className="text-stone-600 text-sm mt-1">Temporary closures: 14–17 Sep & 21–22 Sep. One-way direction (Areeiro → Ruivo) maintained.</p>
          </div>
        </div>

        {/* SECÇÃO COMO RESERVAR */}
        <a href="https://simplifica.madeira.gov.pt" target="_blank" rel="noopener noreferrer" className="mt-4 bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex items-center gap-4 hover:bg-emerald-100 transition block">
          <span className="text-2xl">📅</span>
          <div className="flex-1">
            <p className="font-bold text-emerald-800 text-sm uppercase tracking-wide">Need to book a slot?</p>
            <p className="text-stone-800 font-semibold mt-1">How to reserve your PR trail permit — book on the official SIMplifica portal</p>
          </div>
          <span className="text-emerald-700 text-xl">→</span>
        </a>

        {/* TOGGLE ILHA + CONTADORES */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-8">
          <div className="inline-flex bg-stone-100 rounded-full p-1">
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

          <div className="flex gap-3">
            <div className="border border-stone-200 rounded-2xl px-5 py-3 text-center">
              <p className={'text-2xl font-black ' + statusConfig.open.count}>{counts.open}</p>
              <p className="text-stone-400 text-xs uppercase tracking-wider">Open</p>
            </div>
            <div className="border border-stone-200 rounded-2xl px-5 py-3 text-center">
              <p className={'text-2xl font-black ' + statusConfig.partial.count}>{counts.partial}</p>
              <p className="text-stone-400 text-xs uppercase tracking-wider">Partial</p>
            </div>
            <div className="border border-stone-200 rounded-2xl px-5 py-3 text-center">
              <p className={'text-2xl font-black ' + statusConfig.closed.count}>{counts.closed}</p>
              <p className="text-stone-400 text-xs uppercase tracking-wider">Closed</p>
            </div>
          </div>
        </div>

        {/* Filtros + pesquisa */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-8">
          <div className="flex gap-2 flex-wrap">
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
          <input
            type="text"
            placeholder="Search trails..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-white border border-stone-200 rounded-full px-5 py-2 focus:outline-none focus:border-stone-400"
          />
        </div>

        {/* Cards */}
        {loading ? (
          <p className="text-stone-400 mt-10">Loading trails...</p>
        ) : filtered.length === 0 ? (
          <p className="text-stone-400 mt-10">No trails match.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {filtered.map(trail => {
              const cfg = statusConfig[trail.status] || statusConfig.open
              return (
                <a key={trail.id} href={'/trails/' + trail.slug} className="group rounded-3xl overflow-hidden border border-stone-100 hover:shadow-xl transition">
                  <div className="relative h-48 overflow-hidden">
                    <img src={trail.image_url} alt={trail.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-stone-900 text-xs font-bold px-3 py-1 rounded-full">{trail.code}</span>
                    <span className={'absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 ' + cfg.badge}>
                      <span className={'w-2 h-2 rounded-full ' + cfg.dot}></span>
                      {cfg.label}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg">{trail.name}</h3>
                    <p className="text-stone-500 text-sm mt-1">⛰ {trail.distance}</p>
                  </div>
                </a>
              )
            })}
          </div>
        )}

        {/* ALWAYS TRAIL-READY / IFCN */}
        <div className="mt-16 bg-stone-900 text-white rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-black">Always trail-ready</h2>
            <p className="text-stone-300 mt-3 max-w-lg">We show the latest trail status so you always know before you head out. For official notices, check the IFCN website directly.</p>
            <a href="https://ifcn.madeira.gov.pt" target="_blank" rel="noopener noreferrer" className="inline-block mt-5 bg-white text-stone-900 px-6 py-3 rounded-full font-semibold hover:bg-stone-100 transition">
              Official IFCN Website →
            </a>
          </div>
        </div>

      </section>
      <Footer />
    </main>
  )
}