'use client'

import dynamic from 'next/dynamic'

const MapView = dynamic(() => import('./MapView'), {
  ssr: false,
  loading: () => (
    <div className="h-[350px] w-full rounded-3xl bg-stone-100 flex items-center justify-center text-stone-400">
      Loading map...
    </div>
  ),
})

export default function TrailMap({ latitude, longitude, name }) {
  if (!latitude || !longitude) return null
  return <MapView latitude={latitude} longitude={longitude} name={name} />
}