import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Chip, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StarIcon from '@mui/icons-material/Star';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAddOutlined';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import useFetch from '../hooks/useFetch.js';
import StateView from '../components/StateView.jsx';
import { img } from '../api/tmdb.js';
import { useWatchlist } from '../hooks/useWatchlist.jsx';

export default function Details() {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const valid = type === 'movie' || type === 'tv';
  const { data: d, loading, error } = useFetch(valid ? `/${type}/${id}` : null);
  const { data: videoData } = useFetch(valid ? `/${type}/${id}/videos` : null);
  const { has, toggle } = useWatchlist();
  const [trailerOpen, setTrailerOpen] = useState(false);

  const trailer = videoData?.results?.find((video) =>
    video.site === 'YouTube' && video.type === 'Trailer' && video.official,
  ) || videoData?.results?.find((video) =>
    video.site === 'YouTube' && video.type === 'Trailer',
  ) || videoData?.results?.find((video) =>
    video.site === 'YouTube' && video.type === 'Teaser',
  );

  if (!valid) return <Typography>Page not found.</Typography>;

  const title = d?.title || d?.name || 'Untitled';
  const date = d?.release_date || d?.first_air_date;
  const poster = img(d?.poster_path);
  const backdrop = img(d?.backdrop_path, 'w1280');
  const saved = d ? has(d.id, type) : false;

  return (
    <>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 2 }}>Back</Button>
      <StateView loading={loading} error={error} empty={!d}>
        {d && (
          <Box sx={{ borderRadius: 3, overflow: 'hidden', bgcolor: 'background.paper', p: { xs: 2, md: 4 },
            backgroundImage: backdrop ? `linear-gradient(rgba(13,13,18,.88), rgba(13,13,18,.95)), url(${backdrop})` : 'none',
            backgroundSize: 'cover', backgroundPosition: 'center',
            display: 'flex', gap: 4, flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'center', sm: 'flex-start' } }}>
            <Box sx={{ flex: '0 0 auto', width: { xs: 200, md: 280 } }}>
              {poster ? (
                <Box component="img" src={poster} alt={title} sx={{ width: '100%', borderRadius: 2, display: 'block' }} />
              ) : (
                <Box sx={{ aspectRatio: '2/3', bgcolor: 'action.hover', borderRadius: 2, display: 'grid', placeItems: 'center' }}>No poster</Box>
              )}
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="h4" fontWeight={800}>{title}</Typography>
              {d.tagline && <Typography color="text.secondary" fontStyle="italic">{d.tagline}</Typography>}
              <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', flexWrap: 'wrap', my: 2 }}>
                <Chip icon={<StarIcon />} label={d.vote_average ? `${d.vote_average.toFixed(1)} / 10` : 'Not rated'} color="primary" />
                <Typography variant="body2">{date ? `Released: ${date}` : 'Release date unknown'}</Typography>
                {(d.runtime || d.number_of_seasons) && (
                  <Typography variant="body2">{d.runtime ? `${d.runtime} min` : `${d.number_of_seasons} season(s)`}</Typography>
                )}
              </Box>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                {d.genres?.length ? d.genres.map((g) => <Chip key={g.id} label={g.name} variant="outlined" />) : <Chip label="No genre info" variant="outlined" />}
              </Box>
              <Typography variant="h6" sx={{ mb: 0.5 }}>Overview</Typography>
              <Typography sx={{ mb: 3, maxWidth: 720 }}>{d.overview || 'No overview available.'}</Typography>
              <Button variant={saved ? 'outlined' : 'contained'} startIcon={saved ? <BookmarkAddedIcon /> : <BookmarkAddIcon />}
                onClick={() => toggle({ id: d.id, type, title, poster_path: d.poster_path, vote_average: d.vote_average, date })}>
                {saved ? 'Remove from Watchlist' : 'Add to Watchlist'}
              </Button>
              <Button variant="outlined" startIcon={<PlayArrowIcon />} disabled={!trailer}
                onClick={() => setTrailerOpen(true)} sx={{ ml: 1 }}>
                Play Trailer
              </Button>
            </Box>
          </Box>
        )}
      </StateView>
      <Dialog open={trailerOpen} onClose={() => setTrailerOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>{title} - Trailer</DialogTitle>
        <DialogContent>
          {trailer && (
            <Box sx={{ aspectRatio: '16 / 9', bgcolor: 'black' }}>
              <Box component="iframe" src={`https://www.youtube-nocookie.com/embed/${trailer.key}?autoplay=1`}
                title={`${title} trailer`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen sx={{ width: '100%', height: '100%', border: 0 }} />
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
