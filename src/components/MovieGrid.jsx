import { Box } from '@mui/material';
import MovieCard from './MovieCard.jsx';

// Responsive poster grid: 2 columns on phones up to 6 on wide screens.
export default function MovieGrid({ items, type }) {
  return (
    <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)', lg: 'repeat(5, 1fr)', xl: 'repeat(6, 1fr)' } }}>
      {items.map((m) => <MovieCard key={`${m.media_type || type}-${m.id}`} item={m} type={type} />)}
    </Box>
  );
}
