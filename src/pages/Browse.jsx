import { useState, useEffect } from 'react';
import { Box, Chip, MenuItem, Pagination, TextField, Typography } from '@mui/material';
import useFetch from '../hooks/useFetch.js';
import MovieGrid from '../components/MovieGrid.jsx';
import StateView from '../components/StateView.jsx';

// Shared page for Movies (type="movie") and TV Shows (type="tv").
export default function Browse({ type }) {
  const [genre, setGenre] = useState('');
  const [sort, setSort] = useState('popularity.desc');
  const [page, setPage] = useState(1);

  useEffect(() => { setGenre(''); setSort('popularity.desc'); setPage(1); }, [type]);

  const genres = useFetch(`/genre/${type}/list`);
  const params = { page, sort_by: sort, ...(genre && { with_genres: genre }) };
  if (sort === 'vote_average.desc') params['vote_count.gte'] = 200;
  const { data, loading, error } = useFetch(`/discover/${type}`, params);
  const items = data?.results || [];
  const newest = type === 'movie' ? 'primary_release_date.desc' : 'first_air_date.desc';

  return (
    <>
      <Typography variant="h4" fontWeight={800} sx={{ mb: 2 }}>{type === 'movie' ? 'Movies' : 'TV Shows'}</Typography>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
        <Chip label="All" color={genre === '' ? 'primary' : 'default'} onClick={() => { setGenre(''); setPage(1); }} />
        {(genres.data?.genres || []).map((g) => (
          <Chip key={g.id} label={g.name} color={genre === g.id ? 'primary' : 'default'}
            onClick={() => { setGenre(g.id); setPage(1); }} />
        ))}
      </Box>
      <TextField select size="small" label="Sort by" value={sort} sx={{ minWidth: 200, mb: 3 }}
        onChange={(e) => { setSort(e.target.value); setPage(1); }}>
        <MenuItem value="popularity.desc">Popularity</MenuItem>
        <MenuItem value="vote_average.desc">Rating</MenuItem>
        <MenuItem value={newest}>Newest</MenuItem>
      </TextField>

      <StateView loading={loading} error={error} empty={!items.length}>
        <MovieGrid items={items} type={type} />
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination page={page} count={Math.min(data?.total_pages || 1, 500)} color="primary"
            siblingCount={0} onChange={(_, p) => { setPage(p); window.scrollTo({ top: 0 }); }} />
        </Box>
      </StateView>
    </>
  );
}
