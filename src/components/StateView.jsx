import { Alert, Box, CircularProgress, Typography } from '@mui/material';

// Shows loading / error / empty states; renders children when data is ready.
export default function StateView({ loading, error, empty, emptyText = 'No results found.', children }) {
  if (loading)
    return <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}><CircularProgress /></Box>;
  if (error) return <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>;
  if (empty) return <Typography color="text.secondary" sx={{ py: 4, textAlign: 'center' }}>{emptyText}</Typography>;
  return children;
}
