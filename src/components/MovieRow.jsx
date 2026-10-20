import { Box, Typography } from '@mui/material';
import useFetch from '../hooks/useFetch.js';
import MovieCard from './MovieCard.jsx';
import StateView from './StateView.jsx';

// Horizontal scrolling row for a homepage section.
export default function MovieRow({ title, path, params, type }) {
  const { data, loading, error } = useFetch(path, params);
  const items = data?.results || [];
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 1.5 }}>{title}</Typography>
      <StateView loading={loading} error={error} empty={!items.length}>
        <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 1 }}>
          {items.map((m) => (
            <Box key={`${m.media_type || type}-${m.id}`} sx={{ flex: '0 0 auto', width: { xs: 130, sm: 160 } }}>
              <MovieCard item={m} type={type} />
            </Box>
          ))}
        </Box>
      </StateView>
    </Box>
  );
}
