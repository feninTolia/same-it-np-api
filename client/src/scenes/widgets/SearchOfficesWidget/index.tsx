import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { getWarehousesFetch } from '../../../API/getWarehousesFetch';
import WidgetWrapper from '../../../components/WidgetWrapper';
import { office } from '../../../shared/types';
import Form from './Form';
import PostOfficesList from './PostOfficesList';
import { useAppSelector } from '../../../hook';

const SearchOfficesWidget: React.FC = () => {
  const [officesList, setOfficesList] = useState<office[]>([]);
  const { wareHousesSelect } = useAppSelector((state) => state.getWarehouses);

  const getOfficesList = async () => {
    console.log('wareHousesSelect.CityName', wareHousesSelect.CityName);

    const result = await getWarehousesFetch({
      CityRef: wareHousesSelect.CityRef,
      CityName: wareHousesSelect.CityName,
    });
    if (!result) return;

    setOfficesList(result);
  };

  useEffect(() => {
    if (wareHousesSelect.CityRef === '') return;
    getOfficesList();
  }, [wareHousesSelect]);

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

        <Form getOfficesList={getOfficesList} />

        {officesList.length !== 0 ? (
          <PostOfficesList officesList={officesList} />
        ) : null}
      </WidgetWrapper>
    </Box>
  );
};

export default SearchOfficesWidget;
