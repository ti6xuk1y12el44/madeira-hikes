import { supabase } from './lib/supabase'
import FadeIn from './components/FadeIn'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WeatherWidget from './components/WeatherWidget'

const difficultyColor = {
  Easy: 'bg-green-100 text-green-700',
  Moderate: 'bg-amber-100 text-amber-700',
  Hard: 'bg-stone-900 text-white',
}

export default async function Home() {
  const { data: trails } = await supabase
    .from('trails')
    .select('*')
    .order('created_at')

  const popular = trails?.slice(0, 3) || []

  return (
    <main className="bg-white text-stone-900">

      <Navbar />

      <section className="relative h-[70vh] flex items-end overflow-hidden">
        <img src="/hiking.jpg" alt="Madeira mountains" className="absolute inset-0 w-full h-full object-cover animate-slow-zoom" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="relative px-6 md:px-12 pb-16 max-w-4xl">
          <h1 className="text-white text-5xl md:text-7xl font-black leading-tight mt-3">Every trail. Every levada. One island.</h1>
          <p className="text-stone-200 text-lg mt-4 max-w-xl">Plan your hike, book your permit and explore the wild beauty of Madeira — from misty peaks to hidden waterfalls.</p>
          <a href="/trails" className="inline-block mt-6 bg-white text-stone-900 px-8 py-4 rounded-full font-semibold hover:bg-stone-100">Explore trails →</a>
        </div>
      </section>

      <section className="px-6 md:px-12 -mt-8 relative z-10 max-w-5xl mx-auto">
        <WeatherWidget />
      </section>

      <FadeIn>
      <section className="px-6 md:px-12 max-w-6xl mx-auto mt-20">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-3xl font-black">Popular trails</h2>
          <a href="/trails" className="text-stone-500 font-medium hover:text-stone-900">See all →</a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {popular.map(trail => (
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
      </section>
      </FadeIn>

      <FadeIn delay={100}>
      <section className="px-6 md:px-12 max-w-6xl mx-auto mt-20">
        <div className="relative rounded-3xl overflow-hidden h-72 flex items-center">
          <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative px-8 md:px-14 max-w-xl">
            <h2 className="text-white text-3xl md:text-4xl font-black">Need a permit?</h2>
            <p className="text-stone-200 mt-3">Some trails require an official permit. We'll guide you through booking it on the SIMplifica portal.</p>
            <a href="/permits" className="inline-block mt-5 bg-white text-stone-900 px-6 py-3 rounded-full font-semibold hover:bg-stone-100">View permits</a>
          </div>
        </div>
      </section>
      </FadeIn>

      <footer className="px-6 md:px-12 max-w-6xl mx-auto mt-24 py-10 border-t border-stone-100 flex flex-col md:flex-row justify-between items-center gap-4 text-stone-500 text-sm">
        <p className="font-black text-stone-900">The best way to explore Madeira on foot</p>
        <div className="flex gap-6">
          <a href="/trails" className="hover:text-stone-900">Trails</a>
          <a href="/weather" className="hover:text-stone-900">Weather</a>
          <a href="/permits" className="hover:text-stone-900">Permits</a>
        </div>
      </footer>
<Footer />
    </main>
  )
}