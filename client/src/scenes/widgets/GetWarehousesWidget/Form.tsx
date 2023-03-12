import {
  Button,
  TextField,
  useMediaQuery,
  useTheme,
  MenuItem,
  ButtonGroup,
  Box,
} from '@mui/material';
import debounce from 'lodash.debounce';
import { useMemo, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { searchSettlementsFetch } from '@/API/searchSettlementsFetch';
import { useAppDispatch, useAppSelector } from '@/hook';
import { addSelectCity } from '@/store/NPSlice';
import {
  cityNameValidation,
  warehouseNumberValidation,
} from './formValidation';

type Props = {
  getWarehouses: (cityRef?: string) => void;
};
interface IFormValue {
  cityName: string;
  warehouseNumber?: string;
}
interface ISettlement {
  DeliveryCity: string;
  Present: string;
}

const Form = ({ getWarehouses }: Props) => {
  const [settlements, setSettlements] = useState<ISettlement[]>([]);
  const [settlementsIsShown, setSettlementsIsShown] = useState(false);
  const [warehouseNumber, setWarehouseNumber] = useState('');
  const { CityName } = useAppSelector((state) => state.wareHousesSelect);
  const dispatch = useAppDispatch();

  const isNonMobileScreens = useMediaQuery('(min-width:1000px)');
  const { palette } = useTheme();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormValue>({ values: { cityName: CityName, warehouseNumber } });

  const searchSettlements = async (input: string) => {
    if (input.length < 2) return;

    const res = await searchSettlementsFetch(input);
    if (res) setSettlements(res.at(0).Addresses);
  };

  const debouncedSearchSettlements = useMemo(
    () => debounce(searchSettlements, 300),
    []
  );

  const onSubmit: SubmitHandler<IFormValue> = async (data) => {
    console.log(data.warehouseNumber);
    getWarehouses(data.warehouseNumber);
    setSettlementsIsShown(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        position: 'relative',
      }}
    >
      <Controller
        control={control}
        name="cityName"
        rules={cityNameValidation}
        render={({ field }) => (
          <TextField
            variant="outlined"
            value={field.value}
            label="Місто"
            onFocus={() => {
              setSettlementsIsShown(true);
            }}
            onChange={(e) => {
              field.onChange(e);
              debouncedSearchSettlements(e.target.value);
              setSettlementsIsShown(true);
            }}
            sx={{
              width: isNonMobileScreens ? '35%' : '100%',
              zIndex: 15,
            }}
            error={!!errors.cityName?.message}
            helperText={
              errors.cityName?.message || 'Оберіть з випадаючого списку'
            }
          />
        )}
      />
      <ButtonGroup
        onMouseLeave={() => setSettlementsIsShown(false)}
        sx={{
          display: settlementsIsShown ? 'block' : 'none',
          position: 'absolute',
          maxHeight: 100,
          width: isNonMobileScreens ? '35%' : '100%',
          overflowY: 'scroll',
          bgcolor: palette.background.paper,
          zIndex: 15,
          border: '1px solid rgba(0, 0, 0, 0.299)',
          borderTop: 'transparent',
          top: '52px',
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        }}
      >
        {settlements.map(({ DeliveryCity, Present }) => (
          <MenuItem
            key={DeliveryCity}
            value={Present}
            onClick={() => {
              dispatch(
                addSelectCity({
                  CityRef: DeliveryCity,
                  CityName: Present,
                })
              );
              setWarehouseNumber('');
              setSettlementsIsShown(false);
            }}
          >
            {Present}
          </MenuItem>
        ))}
      </ButtonGroup>

      <Controller
        control={control}
        name="warehouseNumber"
        //TODO rules={warehouseNumberValidation}
        render={({ field }) => (
          <TextField
            variant="outlined"
            value={field.value}
            label="№ відділення"
            onChange={(e) => {
              field.onChange(e);
              setWarehouseNumber(e.target.value);
            }}
            error={!!errors.warehouseNumber?.message}
            helperText={errors.warehouseNumber?.message}
            sx={{
              width: isNonMobileScreens ? '35%' : '100%',
            }}
          />
        )}
      />

      <Button
        variant="contained"
        sx={{
          height: 53,
          transition: '250ms',
          width: isNonMobileScreens ? '20%' : '100%',
          '&:hover': { color: palette.background.paper },
        }}
        type="submit"
      >
        Шукати
      </Button>
    </form>
  );
};

export default Form;
