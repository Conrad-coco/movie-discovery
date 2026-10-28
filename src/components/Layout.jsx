import { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItemButton, ListItemIcon,
  ListItemText, Box, InputBase, Badge, useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useTheme } from '@mui/material/styles';
import { useWatchlist } from '../hooks/useWatchlist.jsx';

const W = 220;
const links = [
  { label: 'Home', to: '/', icon: <HomeIcon /> },
  { label: 'Movies', to: '/movies', icon: <MovieIcon /> },
  { label: 'TV Shows', to: '/tv', icon: <TvIcon /> },
  { label: 'My Watchlist', to: '/watchlist', icon: <BookmarkIcon /> },
];

export default function Layout() {
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up('md'));
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { items } = useWatchlist();

  const submit = (e) => {
    e.preventDefault();
    if (q.trim()) navigate(`/search?q=${encodeURIComponent(q.trim())}`);
  };

  const menu = (
    <List sx={{ px: 1 }}>
      {links.map((l) => (
        <ListItemButton key={l.to} component={Link} to={l.to}
          selected={l.to === '/' ? pathname === '/' : pathname.startsWith(l.to)}
          onClick={() => setOpen(false)} sx={{ borderRadius: 2, mb: 0.5 }}>
          <ListItemIcon sx={{ minWidth: 40 }}>
            {l.to === '/watchlist' ? (
              <Badge color="primary" badgeContent={items.length}>{l.icon}</Badge>
            ) : l.icon}
          </ListItemIcon>
          <ListItemText primary={l.label} />
        </ListItemButton>
      ))}
    </List>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" color="default" elevation={0}
        sx={{ zIndex: (t) => t.zIndex.drawer + 1, bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}>
        <Toolbar sx={{ gap: 1 }}>
          {!desktop && (
            <IconButton edge="start" aria-label="menu" onClick={() => setOpen(true)}><MenuIcon /></IconButton>
          )}
          <Typography component={Link} to="/" variant="h6" noWrap
            sx={{ color: 'primary.main', fontWeight: 800, textDecoration: 'none', mr: 2 }}>
            🎬 Now Showing
          </Typography>
          <Box component="form" onSubmit={submit}
            sx={{ display: 'flex', alignItems: 'center', bgcolor: 'action.hover', borderRadius: 5, px: 2, flexGrow: 1, maxWidth: 480, ml: 'auto' }}>
            <InputBase fullWidth placeholder="Search movies & TV shows…" value={q}
              onChange={(e) => setQ(e.target.value)} inputProps={{ 'aria-label': 'search' }} />
            <IconButton type="submit" size="small" aria-label="submit search"><SearchIcon /></IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer variant={desktop ? 'permanent' : 'temporary'} open={desktop || open}
        onClose={() => setOpen(false)} ModalProps={{ keepMounted: true }}
        sx={{ width: desktop ? W : 0, flexShrink: 0,
          '& .MuiDrawer-paper': { width: W, boxSizing: 'border-box', borderRight: 1, borderColor: 'divider' } }}>
        <Toolbar />
        {menu}
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, minWidth: 0, p: { xs: 1.5, sm: 3 } }}>
        <Toolbar />
        <Outlet />
        <Typography variant="caption" color="text.secondary" component="div" sx={{ mt: 6, textAlign: 'center' }}>
          This product uses the TMDB API but is not endorsed or certified by TMDB.
        </Typography>
      </Box>
    </Box>
  );
}
