import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { officesListFetch } from '../../API/officesListFetch';
import WidgetWrapper from '../../components/WidgetWrapper';
import { office } from '../../shared/types';
import StickyHeadTable from '../HomePage/table';

type Props = {};

const SearchOfficesWidget = (props: Props) => {
  const [officesList, setOfficesList] = useState<office[]>([]);
  const [cityName, setCityName] = useState<string>('Херсон');
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)');
  const { palette } = useTheme();

  const getOfficesList = async () => {
    const result = await officesListFetch(cityName);

    setOfficesList(result);
  };

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
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
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
          onClick={getOfficesList}
        >
          Шукати
        </Button>

        <StickyHeadTable officesList={officesList} />
      </WidgetWrapper>
    </Box>
  );
};

export default SearchOfficesWidget;
