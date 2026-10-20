import { useSearchParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import useFetch from '../hooks/useFetch.js';
import MovieGrid from '../components/MovieGrid.jsx';
import StateView from '../components/StateView.jsx';

export default function Search() {
  const [params] = useSearchParams();
  const q = params.get('q') || '';
  const { data, loading, error } = useFetch(q ? '/search/multi' : null, { query: q });
  const items = (data?.results || []).filter((r) => r.media_type !== 'person');

  return (
    <>
      <Typography variant="h4" fontWeight={800} sx={{ mb: 3 }}>
        {q ? `Results for “${q}”` : 'Search'}
      </Typography>
      {!q ? (
        <Typography color="text.secondary">Type a title in the search bar above.</Typography>
      ) : (
        <StateView loading={loading} error={error} empty={!items.length}
          emptyText={`No movies or TV shows match “${q}”.`}>
          <MovieGrid items={items} />
        </StateView>
      )}
    </>
  );
}
