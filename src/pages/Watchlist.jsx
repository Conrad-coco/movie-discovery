import { Typography } from '@mui/material';
import { useWatchlist } from '../hooks/useWatchlist.jsx';
import MovieGrid from '../components/MovieGrid.jsx';
import StateView from '../components/StateView.jsx';

export default function Watchlist() {
  const { items } = useWatchlist();
  // Saved items are reshaped like API items so MovieCard can be reused.
  const cards = items.map((i) => ({
    id: i.id, media_type: i.type, title: i.title, poster_path: i.poster_path,
    vote_average: i.vote_average, release_date: i.date,
  }));
  return (
    <>
      <Typography variant="h4" fontWeight={800} sx={{ mb: 3 }}>My Watchlist</Typography>
      <StateView empty={!cards.length} emptyText="Your watchlist is empty. Tap the bookmark on any poster to save it.">
        <MovieGrid items={cards} />
      </StateView>
    </>
  );
}
