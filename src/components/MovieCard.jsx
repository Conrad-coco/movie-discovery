import { Link } from 'react-router-dom';
import { Card, CardActionArea, CardContent, Typography, Box, IconButton, Chip } from '@mui/material';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAddOutlined';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import StarIcon from '@mui/icons-material/Star';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import { img } from '../api/tmdb.js';
import { useWatchlist } from '../hooks/useWatchlist.jsx';

export default function MovieCard({ item, type }) {
  const t = item.media_type || type || (item.title ? 'movie' : 'tv');
  const title = item.title || item.name || 'Untitled';
  const date = item.release_date || item.first_air_date;
  const year = date ? date.slice(0, 4) : 'N/A';
  const rating = item.vote_average ? item.vote_average.toFixed(1) : null;
  const poster = img(item.poster_path);
  const { has, toggle } = useWatchlist();
  const saved = has(item.id, t);

  const save = () =>
    toggle({ id: item.id, type: t, title, poster_path: item.poster_path, vote_average: item.vote_average, date });

  return (
    <Card sx={{ position: 'relative', height: '100%', transition: 'transform .2s, box-shadow .2s',
      '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 } }}>
      <CardActionArea component={Link} to={`/${t}/${item.id}`}>
        {poster ? (
          <Box component="img" src={poster} alt={title} loading="lazy"
            sx={{ width: '100%', aspectRatio: '2/3', objectFit: 'cover', display: 'block' }} />
        ) : (
          <Box sx={{ aspectRatio: '2/3', display: 'grid', placeItems: 'center', bgcolor: 'action.hover' }}>
            <ImageNotSupportedIcon fontSize="large" color="disabled" />
          </Box>
        )}
        <CardContent sx={{ p: 1.2 }}>
          <Typography variant="body2" fontWeight={600} noWrap title={title}>{title}</Typography>
          <Typography variant="caption" color="text.secondary">{year}</Typography>
        </CardContent>
      </CardActionArea>
      {rating && (
        <Chip size="small" icon={<StarIcon />} label={rating}
          sx={{ position: 'absolute', top: 6, left: 6, bgcolor: 'rgba(0,0,0,.75)' }} />
      )}
      <IconButton size="small" onClick={save} aria-label={saved ? 'Remove from watchlist' : 'Add to watchlist'}
        sx={{ position: 'absolute', top: 4, right: 4, bgcolor: 'rgba(0,0,0,.65)' }}>
        {saved ? <BookmarkAddedIcon color="primary" /> : <BookmarkAddIcon />}
      </IconButton>
    </Card>
  );
}
