import Navbar from '../components/Navbar'
import Footer from '../components/Footer'


const guides = [
  {
    icon: '🥾',
    title: 'Choosing your first trail',
    text: 'New to Madeira? Start with an Easy levada walk like the Levada do Alecrim before tackling the high peaks. Build up to the harder PR1 traverse once you know the terrain.',
  },
  {
    icon: '🌦️',
    title: 'Reading the mountain weather',
    text: 'Conditions change fast between the coast and the peaks. Funchal can be sunny while Pico do Areeiro sits in cloud. Always check the forecast for the trailhead, not just the city.',
  },
  {
    icon: '🎒',
    title: 'What to pack',
    text: 'Water (min. 2L), layers for sudden cold, a waterproof jacket, proper hiking boots, sunscreen and a charged phone. Some tunnels on levada walks need a headtorch.',
  },
  {
    icon: '📋',
    title: 'Permits and rules',
    text: 'Several classified PR trails now require a paid permit booked by time slot on the official SIMplifica portal. Residents, children under 12 and certified disabilities are exempt.',
  },
  {
    icon: '🚗',
    title: 'Getting to the trailheads',
    text: 'Most trailheads have free parking but fill early in summer. Public buses reach some, but a rental car gives the most flexibility for early starts and one-way routes.',
  },
  {
    icon: '🌿',
    title: 'Respect the laurisilva',
    text: 'Madeira\'s laurel forest is a UNESCO World Heritage site. Stay on marked paths, take all litter with you, and never pick plants. Leave the trail as you found it.',
  },
]

export default function GuidesPage() {
  return (
    <main className="bg-white text-stone-900 min-h-screen">
      <Navbar solid={true} />

      <section className="px-6 md:px-12 max-w-5xl mx-auto pt-32 pb-24">
        <h1 className="text-4xl md:text-5xl font-black">Hiking guides</h1>
        <p className="text-stone-500 mt-3 max-w-2xl">
          Everything you need to know before heading out into Madeira's mountains and levadas.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {guides.map(guide => (
            <div key={guide.title} className="border border-stone-100 rounded-3xl p-7 hover:shadow-lg transition">
              <p className="text-4xl">{guide.icon}</p>
              <h2 className="font-black text-xl mt-4">{guide.title}</h2>
              <p className="text-stone-600 mt-2 leading-relaxed">{guide.text}</p>
            </div>
          ))}
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-3xl p-8 mt-10 text-center">
          <h2 className="font-black text-2xl">Ready to explore?</h2>
          <p className="text-stone-600 mt-2">Browse all official PR trails and book your permit.</p>
          <a href="/trails" className="inline-block mt-5 bg-stone-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-stone-800">View all trails</a>
        </div>
      </section>
      <Footer />
    </main>
  )
}