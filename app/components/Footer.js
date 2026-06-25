export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 mt-24">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-14">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-2">
            <p className="font-black text-2xl text-white leading-tight">MADEIRA<br/>HIKES</p>
            <p className="text-stone-400 mt-4 max-w-sm leading-relaxed">
              The best way to explore Madeira on foot. Trail status, permits and guides — everything you need before you head out.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-bold text-white">Explore</h3>
            <ul className="mt-4 space-y-2 text-stone-400">
              <li><a href="/trails" className="hover:text-white transition">Trails</a></li>
              <li><a href="/status" className="hover:text-white transition">Trail status</a></li>
              <li><a href="/weather" className="hover:text-white transition">Weather</a></li>
              <li><a href="/guides" className="hover:text-white transition">Guides</a></li>
            </ul>
          </div>

          {/* Plan */}
          <div>
            <h3 className="font-bold text-white">Plan your hike</h3>
            <ul className="mt-4 space-y-2 text-stone-400">
              <li><a href="/permits" className="hover:text-white transition">Permits</a></li>
              <li>
                <a href="https://simplifica.madeira.gov.pt" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                  Book on SIMplifica
                </a>
              </li>
              <li>
                <a href="https://ifcn.madeira.gov.pt" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                  Official IFCN
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-stone-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-stone-500 text-sm">
          <p>© 2026 Madeira Hikes. Trail data for guidance — always check official sources before hiking.</p>
          <p>Made in Madeira</p>
        </div>

      </div>
    </footer>
  )
}