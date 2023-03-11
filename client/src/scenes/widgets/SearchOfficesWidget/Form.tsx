import {
  Button,
  TextField,
  useMediaQuery,
  useTheme,
  MenuItem,
  ButtonGroup,
} from '@mui/material';
import debounce from 'lodash.debounce';

import { useMemo, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { searchSettlementsFetch } from '../../../API/searchSettlementsFetch';
import { useAppSelector } from '../../../hook';
import { addSelectCity } from '../../../store/getWarehousesSlice';
import { formValidation } from './formValidation';

type Props = {
  getOfficesList: (cityRef?: string) => void;
};
interface IFormValue {
  cityName: string;
  wareHouseNumber?: string;
}
interface ISettlement {
  DeliveryCity: string;
  Present: string;
}

const Form = ({ getOfficesList }: Props) => {
  const [settlements, setSettlements] = useState<ISettlement[]>([]);
  const [settlementsDropdownIsShown, setSettlementsDropdownIsShown] =
    useState(false);
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)');
  const { palette } = useTheme();
  const dispatch = useDispatch();

  const { wareHousesSelect } = useAppSelector((state) => state.getWarehouses);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormValue>({ values: { cityName: wareHousesSelect.CityName } });

  const onSubmit: SubmitHandler<IFormValue> = (data) => {
    // getOfficesList();
    setSettlementsDropdownIsShown(false);
  };

  const searchSettlements = async (input: string) => {
    if (input.length < 2) return;

    const res = await searchSettlementsFetch(input);
    console.log(res);

    if (res) {
      setSettlements(res.at(0).Addresses);
    } else console.log('wrong request');
  };

  const debouncedSearchSettlements = useMemo(
    () => debounce(searchSettlements, 300),
    []
  );

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
        rules={formValidation.cityName}
        render={({ field }) => (
          <TextField
            autoComplete="false"
            variant="outlined"
            value={field.value}
            onFocus={() => {
              setSettlementsDropdownIsShown(true);
            }}
            onChange={(e) => {
              field.onChange(e);
              debouncedSearchSettlements(e.target.value);
              setSettlementsDropdownIsShown(true);
            }}
            label="Місто"
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
        onMouseLeave={() => setSettlementsDropdownIsShown(false)}
        sx={{
          display: settlementsDropdownIsShown ? 'block' : 'none',
          position: 'absolute',
          maxHeight: 100,
          width: isNonMobileScreens ? '35%' : '100%',
          overflowY: 'scroll',
          bgcolor: 'white',
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
              setSettlementsDropdownIsShown(false);
            }}
          >
            {Present}
          </MenuItem>
        ))}
      </ButtonGroup>

      <Controller
        control={control}
        name="wareHouseNumber"
        // rules={formValidation}
        render={({ field }) => (
          <TextField
            variant="outlined"
            value={field.value}
            label="№ відділення"
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
