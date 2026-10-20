import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import App from './App.jsx';
import { WatchlistProvider } from './hooks/useWatchlist.jsx';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#e5a00d' },
    background: { default: '#0d0d12', paper: '#16161d' },
  },
  shape: { borderRadius: 10 },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <WatchlistProvider>
          <App />
        </WatchlistProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
