import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import WidgetWrapper from '../../components/WidgetWrapper';
import StickyHeadTable from '../HomePage/table';

type Props = {};

const SearchOfficesWidget = (props: Props) => {
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)');
  const { palette } = useTheme();

  return (
    <Box width={'80%'} margin="auto">
      <WidgetWrapper
        display={'flex'}
        flexWrap="wrap"
        gap={'1rem'}
        justifyContent="space-between"
      >
        <Typography width={'100%'} variant="h3">
          Пошук відділення за номером або за населеним пунктом
        </Typography>
        <TextField
          variant="outlined"
          // value={}
          label="Місто"
          sx={{
            width: isNonMobileScreens ? '35%' : '100%',
          }}
        />
        <TextField
          variant="outlined"
          // value={}
          disabled
          label="№ відділення"
          sx={{
            width: isNonMobileScreens ? '35%' : '100%',
          }}
        />
        <Button
          variant="contained"
          sx={{
            height: 53,
            transition: '250ms',
            width: isNonMobileScreens ? '20%' : '100%',
            '&:hover': { color: palette.background.paper },
          }}
        >
          Шукати
        </Button>

        <StickyHeadTable />
      </WidgetWrapper>
    </Box>
  );
};

export default SearchOfficesWidget;
