import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Browse from './pages/Browse.jsx';
import Search from './pages/Search.jsx';
import Details from './pages/Details.jsx';
import Watchlist from './pages/Watchlist.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Browse type="movie" />} />
        <Route path="/tv" element={<Browse type="tv" />} />
        <Route path="/search" element={<Search />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/:type/:id" element={<Details />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}
