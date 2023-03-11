import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { officesListFetch } from '../../../API/officesListFetch';
import WidgetWrapper from '../../../components/WidgetWrapper';
import { office } from '../../../shared/types';
import Form from './Form';
import PostOfficesList from './PostOfficesList';

type Props = {};

const SearchOfficesWidget = (props: Props) => {
  const [officesList, setOfficesList] = useState<office[]>([]);
  const [cityName, setCityName] = useState<string>('');
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)');
  const { palette } = useTheme();

  const getOfficesList = async (CityRef: string = '') => {
    console.log(' in getOfficesList');

    const result = await officesListFetch({
      CityRef: CityRef,
      CityName: cityName,
    });

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

        <Form
          cityName={cityName}
          setCityName={setCityName}
          getOfficesList={getOfficesList}
        />

        {officesList.length !== 0 ? (
          <PostOfficesList officesList={officesList} />
        ) : null}
      </WidgetWrapper>
    </Box>
  );
};

export default SearchOfficesWidget;
