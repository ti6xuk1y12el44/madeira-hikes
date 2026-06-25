'use client'

import { useEffect, useState } from 'react'

export default function Navbar({ solid = false }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isSolid = solid || scrolled || open
  const textColor = isSolid ? 'text-stone-900' : 'text-white'

  const links = [
    { href: '/', label: 'Discover' },
    { href: '/trails', label: 'Trails' },
    { href: '/guides', label: 'Guides' },
    { href: '/weather', label: 'Weather' },
    { href: '/status', label: 'Status' },
    { href: '/permits', label: 'Permits' },
  ]

  return (
    <nav
      className={
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ' +
        (isSolid ? 'bg-white/95 backdrop-blur shadow-sm' : 'bg-transparent')
      }
    >
      <div className="flex items-center justify-between px-6 md:px-12 py-5">
        <a href="/" className={'font-black text-xl leading-none tracking-tight transition-colors ' + textColor}>
          MADEIRA<br/>HIKES
        </a>

        {/* links desktop */}
        <div className={'hidden md:flex gap-8 font-medium transition-colors ' + textColor}>
          {links.map(l => (
            <a key={l.href} href={l.href} className="hover:opacity-60">{l.label}</a>
          ))}
        </div>

        <span className={'hidden md:inline text-sm transition-colors ' + textColor}>EN</span>

        {/* botão hamburguer (so para o mobile) */}
        <button
          onClick={() => setOpen(!open)}
          className={'md:hidden flex flex-col gap-1.5 transition-colors ' + textColor}
          aria-label="Toggle menu"
        >
          <span className={'block w-6 h-0.5 bg-current transition-transform ' + (open ? 'rotate-45 translate-y-2' : '')}></span>
          <span className={'block w-6 h-0.5 bg-current transition-opacity ' + (open ? 'opacity-0' : '')}></span>
          <span className={'block w-6 h-0.5 bg-current transition-transform ' + (open ? '-rotate-45 -translate-y-2' : '')}></span>
        </button>
      </div>

      {/* menu para o mobile aberto */}
      {open && (
        <div className="md:hidden bg-white border-t border-stone-100 px-6 py-4 flex flex-col gap-3">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-stone-900 font-medium py-1 hover:opacity-60">{l.label}</a>
          ))}
        </div>
      )}
    </nav>
  )
}