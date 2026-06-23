# Madeira Hikes

A trail discovery and permit-booking prototype for Madeira's official PR hiking trails. Users can browse trails, view detailed information with an interactive map and photo gallery, and get redirected to the official SIMplifica portal to book their permit.

> Prototype built as a proof of concept. Data and images are illustrative.

## Features

- **Trail discovery** — homepage with featured trails pulled live from the database
- **Trail detail pages** — full info (distance, duration, elevation, difficulty), photo gallery, interactive map, and "what to bring" checklist
- **Permit booking** — links out to the official SIMplifica government portal (no payments handled on-site)
- **Live weather** — Funchal conditions (planned: full Open-Meteo integration)
- **Smart navbar** — transparent over the hero, solid white on scroll
- **Scroll animations** — sections fade in as they enter the viewport

## Tech stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js (App Router) |
| Styling | Tailwind CSS |
| Database | Supabase (PostgreSQL) |
| Maps | Leaflet + OpenStreetMap |
| Hosting | Vercel (planned) |

## Getting started

### Prerequisites
- Node.js installed
- A Supabase project

### Setup

1. Clone the repository and install dependencies:

npm install

2. Create a `.env.local` file in the project root:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_publishable_key

3. Run the development server:

npm run dev

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database

The app reads from a single `trails` table in Supabase. Row Level Security (RLS) is enabled so the public can only **read** trails — no writes are possible through the public key.

Main fields: `slug`, `code`, `name`, `difficulty`, `distance`, `duration`, `elevation`, `price_eur`, `image_url`, `gallery`, `description`, `start_point`, `end_point`, `address`, `latitude`, `longitude`.

## Security notes

- RLS enabled on the `trails` table (read-only for the public)
- No payment or personal data is handled — bookings redirect to the official SIMplifica portal
- No API keys with write access are exposed in the frontend

## Roadmap

- Full trails listing page with difficulty filters
- Live weather page (Open-Meteo)
- Guides section
- Move images to Supabase storage
- Deploy to Vercel