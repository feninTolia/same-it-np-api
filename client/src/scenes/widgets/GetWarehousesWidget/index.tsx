import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { getWarehousesFetch } from '@/API/getWarehousesFetch';
import WidgetWrapper from '@/components/WidgetWrapper';
import { warehouse } from '@/shared/types';
import Form from './Form';
import WarehousesList from './WarehousesList';
import { useAppSelector } from '@/hook';

import { ToastContainer } from 'react-toastify';
import { notify } from '@/helpers/toastEmmiter';
import 'react-toastify/dist/ReactToastify.css';

const GetWarehousesWidget: React.FC = () => {
  const [warehouses, setWarehouses] = useState<warehouse[]>([]);
  const { CityRef, CityName } = useAppSelector(
    (state) => state.wareHousesSelect
  );

  const getWarehouses = async (WarehouseId?: string) => {
    const result = await getWarehousesFetch({
      CityRef,
      CityName,
      WarehouseId,
    });

    if (!result) {
      notify('Некоректний запит');
      return;
    }

    setWarehouses(result);
  };

  useEffect(() => {
    if (CityRef === '') return;
    getWarehouses();
  }, [CityRef]);

  return (
    <Box width={'80%'} margin="auto" maxWidth={'1400px'}>
      <WidgetWrapper
        display={'flex'}
        flexWrap="wrap"
        gap={'1rem'}
        justifyContent="space-between"
      >
        <Typography width={'100%'} variant="h3">
          Пошук відділення за номером або за населеним пунктом
        </Typography>

        <Form getWarehouses={getWarehouses} />

        {warehouses.length !== 0 ? (
          <WarehousesList warehouses={warehouses} />
        ) : null}
      </WidgetWrapper>
      <ToastContainer />
    </Box>
  );
};

export default GetWarehousesWidget;
