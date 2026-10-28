# Now Showing – Movie Discovery Web App

A MovieBox-inspired movie and TV discovery site built with **React (Vite)**, **Material UI** and **React Router**, using live data from the **TMDB API**.

## Features
- Dark-themed homepage: Trending, Popular Movies, Action Movies, Popular TV Shows
- Top bar with search; sidebar (drawer on mobile) with Home, Movies, TV Shows, My Watchlist
- Search by title (TMDB `/search/multi`) with loading, empty and error states
- Movies / TV Shows pages with genre filter, sorting and pagination
- Details page: poster, overview, release date, rating, genres
- Watchlist stored in `localStorage` (survives refresh)
- Responsive on desktop, tablet and mobile; missing posters and fields handled

## Technologies
React 18, Vite, Material UI 5, React Router 6, Fetch API, TMDB API

## Run locally
1. Create a free account at https://www.themoviedb.org and request an API key (Settings → API).
2. `npm install`
3. Copy `.env.example` to `.env` and set `VITE_TMDB_API_KEY` to your **v3 API key**.
4. `npm run dev` and open http://localhost:5173

Production build: `npm run build`

## Deploy (Vercel / Netlify)
Add `VITE_TMDB_API_KEY` as an environment variable in the dashboard. `vercel.json` and `public/_redirects` make routes work on refresh.

## Structure
```
src/
  api/tmdb.js              fetch helper + image URLs
  hooks/useFetch.js        data loading (useState + useEffect)
  hooks/useWatchlist.jsx   watchlist context + localStorage
  components/              Layout, MovieCard, MovieGrid, MovieRow, StateView
  pages/                   Home, Browse (Movies/TV), Search, Details, Watchlist
```

## Attribution
This product uses the TMDB API but is not endorsed or certified by TMDB. Data and images © TMDB.
