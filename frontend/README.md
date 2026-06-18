# Johnix Arts — React Portfolio

Premium fine art portfolio built with React 18, Vite 5, Framer Motion 11, and CSS Modules.

## Tech Stack

| Package | Version | Purpose |
|---|---|---|
| React | 18.3 | UI framework |
| React DOM | 18.3 | DOM rendering |
| React Router DOM | 6.26 | Client-side routing |
| Framer Motion | 11.3 | Page transitions & animations |
| React Icons | 5.3 | SVG icon library |
| Vite | 5.4 | Build tool & dev server |
| @vitejs/plugin-react | 4.3 | React Fast Refresh |

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deploy

**Netlify** — drag the `dist/` folder to https://app.netlify.com/drop  
The `_redirects` file handles SPA routing automatically.

**Vercel** — push to GitHub and import at vercel.com (auto-detects Vite)

## Structure

```
src/
├── components/
│   ├── Header/         Header.jsx + Header.module.css
│   ├── Footer/         Footer.jsx + Footer.module.css
│   ├── Lightbox/       Lightbox.jsx + Lightbox.module.css
│   └── ScrollReveal/   ScrollReveal.jsx + ScrollReveal.module.css
├── data/
│   └── artworks.js     37 artworks — edit here to add/remove works
├── hooks/
│   ├── useHeaderScroll.js
│   └── useScrollReveal.js
├── pages/
│   ├── Home/
│   ├── Gallery/
│   ├── ArtworkDetail/
│   ├── About/
│   ├── Commissions/
│   └── Contact/
├── styles/
│   └── global.css      Design tokens, reset, global styles
├── App.jsx
└── main.jsx
public/
└── assets/             All 43 artwork images and videos
```
