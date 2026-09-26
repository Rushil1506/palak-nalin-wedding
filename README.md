# Palak & Nalin — Luxury Wedding Invitation

A lightweight static wedding invitation reconstructed from the inspected Emergent preview and populated with the supplied wedding photographs.

## Public structure
- `index.html` — main guest-facing invitation
- `cover.html` — optional opening-card screen
- `config.js` — single source of wedding facts/content
- `script.js` — rendering and interactions
- `styles.css` — luxury visual system and responsive layout
- `CNAME` — `palaknalin.live` for GitHub Pages
- `.nojekyll` — static-site compatibility
- `assets/` — optimized wedding photographs, social share image and favicon

## Source-verified schedule
- Sangeet — Wednesday, 02 December 2026 — 7:30 PM
- Haldi — Thursday, 03 December 2026 — 11:00 AM
- Shaadi — Thursday, 03 December 2026 — 8:00 PM
- Main venue — The Hilton Lucknow, Vibhuti Khand, Lucknow

The source invitation separately states `7:30 PM ONWARDS` for the main wedding invitation while the Shaadi event says `8:00 in the evening`. Confirm the final guest-facing timing before sending the invitation.

The source invitation does not list Mehendi or Reception, so this build uses the three events actually present in the source: Sangeet, Haldi and Shaadi.

## Assets supplied
- `sangeet.jpg` — Sangeet event
- `haldi.jpg` — Haldi event
- `shaadi.jpg` — Shaadi event (the first uniquely named uploaded photo)
- `couple-formal.webp`
- `couple-floral.webp`
- `couple-mirror.webp`
- `couple-pottery.webp`
- `couple-selfie.webp`

## Local run
```bash
python -m http.server 8000
```
Open `http://localhost:8000/`.

## Deployment
Recommended: GitHub Pages + Name.com DNS. See `DEPLOYMENT.md`.
