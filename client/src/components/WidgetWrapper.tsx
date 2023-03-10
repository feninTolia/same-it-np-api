import { Box } from '@mui/material';
import { styled } from '@mui/system';

const WidgetWrapper = styled(Box)(({ theme }) => ({
  padding: '1.5rem',
  margin: '1rem 0',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '0.75rem',
}));

export default WidgetWrapper;
