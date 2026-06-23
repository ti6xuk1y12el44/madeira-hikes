'use client'

import { useState } from 'react'

export default function Gallery({ images, alt }) {
  const [active, setActive] = useState(0)

  if (!images || images.length === 0) return null

  return (
    <div>
      {/* Foto principal */}
      <div className="rounded-3xl overflow-hidden h-[400px]">
        <img src={images[active]} alt={alt} className="w-full h-full object-cover transition-all duration-300" />
      </div>

      {/* Miniaturas */}
      {images.length > 1 && (
        <div className="flex gap-3 mt-3">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={
                'rounded-xl overflow-hidden h-20 w-28 flex-shrink-0 transition ' +
                (active === i ? 'ring-3 ring-stone-900' : 'opacity-60 hover:opacity-100')
              }
            >
              <img src={img} alt={alt + ' ' + (i + 1)} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}