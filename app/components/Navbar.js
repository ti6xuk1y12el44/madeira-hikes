'use client'

import { useEffect, useState } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const textColor = scrolled ? 'text-stone-900' : 'text-white'

  return (
    <nav
      className={
        'fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 transition-all duration-300 ' +
        (scrolled
          ? 'bg-white/95 backdrop-blur shadow-sm'
          : 'bg-transparent')
      }
    >
      <a href="/" className={'font-black text-xl leading-none tracking-tight transition-colors ' + textColor}>
        MADEIRA<br/>HIKES
      </a>

      <div className={'hidden md:flex gap-8 font-medium transition-colors ' + textColor}>
        <a href="/" className="hover:opacity-60">Discover</a>
        <a href="/trails" className="hover:opacity-60">Trails</a>
        <a href="/guides" className="hover:opacity-60">Guides</a>
        <a href="/weather" className="hover:opacity-60">Weather</a>
        <a href="/permits" className="hover:opacity-60">Permits</a>
      </div>

      <span className={'text-sm transition-colors ' + textColor}>EN</span>
    </nav>
  )
}