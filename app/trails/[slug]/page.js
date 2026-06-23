import { supabase } from '../../lib/supabase'

const difficultyColor = {
  Easy: 'bg-green-100 text-green-700',
  Moderate: 'bg-amber-100 text-amber-700',
  Hard: 'bg-stone-900 text-white',
}

export default async function TrailPage({ params }) {
  const { slug } = await params

  const { data: trail } = await supabase
    .from('trails')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!trail) {
    return (
      <main className="min-h-screen flex items-center justify-center text-stone-500">
        Trail not found.
      </main>
    )
  }

  const simplificaUrl = 'https://simplifica.madeira.gov.pt/services/78-82-259?trail=' + encodeURIComponent(trail.code + ' – ' + trail.name) + '&date=2026-06-23&people=1'
  const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(trail.address || '')

  return (
    <main className="bg-white text-stone-900">

      <nav className="flex items-center justify-between px-6 md:px-12 py-5 border-b border-stone-100">
        <a href="/" className="font-black text-xl leading-none tracking-tight">MADEIRA<br/>HIKES</a>
        <div className="hidden md:flex gap-8 font-medium">
          <a href="/trails" className="hover:text-stone-500">Trails</a>
          <a href="/weather" className="hover:text-stone-500">Weather</a>
          <a href="/permits" className="hover:text-stone-500">Permits</a>
        </div>
      </nav>

      <section className="relative h-[55vh] flex items-end overflow-hidden">
        <img src={trail.image_url} alt={trail.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="relative px-6 md:px-12 pb-10 max-w-4xl">
          <span className={'text-xs font-semibold px-3 py-1 rounded-full ' + (difficultyColor[trail.difficulty] || 'bg-stone-100 text-stone-700')}>{trail.difficulty}</span>
          <h1 className="text-white text-4xl md:text-6xl font-black mt-3">{trail.code} – {trail.name}</h1>
          <div className="flex gap-6 text-stone-200 mt-4 text-sm">
            <span>⛰ {trail.distance}</span>
            <span>↗ {trail.elevation}</span>
            <span>🕑 {trail.duration}</span>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 max-w-6xl mx-auto mt-12 grid grid-cols-1 lg:grid-cols-3 gap-10">

        <div className="lg:col-span-2">
          <h2 className="text-2xl font-black">About the trail</h2>
          <p className="text-stone-600 mt-3 leading-relaxed text-lg">{trail.description}</p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-8">
            <InfoBox label="Distance" value={trail.distance} />
            <InfoBox label="Duration" value={trail.duration} />
            <InfoBox label="Elevation gain" value={trail.elevation} />
            <InfoBox label="Difficulty" value={trail.difficulty} />
            <InfoBox label="Start" value={trail.start_point} />
            <InfoBox label="End" value={trail.end_point} />
          </div>

          <div className="bg-stone-50 rounded-2xl p-6 mt-8">
            <h3 className="font-bold text-lg">How to get there</h3>
            <p className="text-stone-600 mt-2">📍 {trail.address}</p>
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 bg-stone-900 text-white px-5 py-2 rounded-full font-semibold">Google Maps</a>
            <p className="text-stone-400 text-sm mt-3">Parking available at the trailhead (free)</p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mt-6">
            <h3 className="font-bold text-lg">What to bring</h3>
            <div className="flex flex-wrap gap-2 mt-3 text-sm">
              {['Water (min. 2L)', 'Sunscreen', 'Hiking boots', 'Waterproof jacket', 'Snacks', 'Charged phone'].map(item => (
                <span key={item} className="bg-white border border-stone-200 rounded-full px-4 py-2">{item}</span>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="border border-stone-200 rounded-3xl p-6 sticky top-6">
            <h3 className="font-black text-xl">Book Permit</h3>
            <p className="text-3xl font-black mt-2">€{trail.price_eur} <span className="text-stone-400 text-base font-normal">/ per person</span></p>
            <a href={simplificaUrl} target="_blank" rel="noopener noreferrer" className="block text-center mt-6 bg-stone-900 text-white py-4 rounded-full font-semibold hover:bg-stone-800">Reserve on SIMplifica ↗</a>
            <p className="text-stone-400 text-xs text-center mt-3">You'll continue on the official SIMplifica portal to pick your time slot and pay the trail fee.</p>
          </div>
        </div>

      </section>

      <footer className="px-6 md:px-12 max-w-6xl mx-auto mt-24 py-10 border-t border-stone-100 text-stone-500 text-sm">
        <a href="/trails" className="hover:text-stone-900">← Back to all trails</a>
      </footer>

    </main>
  )
}

function InfoBox({ label, value }) {
  return (
    <div className="border border-stone-200 rounded-xl p-4">
      <p className="text-stone-400 text-xs uppercase tracking-wider">{label}</p>
      <p className="font-semibold mt-1">{value}</p>
    </div>
  )
}