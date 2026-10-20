import { Typography } from '@mui/material';
import MovieRow from '../components/MovieRow.jsx';

export default function Home() {
  return (
    <>
      <Typography variant="h4" fontWeight={800} sx={{ mb: 3 }}>Discover</Typography>
      <MovieRow title="🔥 Trending This Week" path="/trending/all/week" />
      <MovieRow title="Popular Movies" path="/movie/popular" type="movie" />
      <MovieRow title="Action Movies" path="/discover/movie" params={{ with_genres: 28, sort_by: 'popularity.desc' }} type="movie" />
      <MovieRow title="Popular TV Shows" path="/tv/popular" type="tv" />
    </>
  );
}
