import {
  Button,
  TextField,
  useMediaQuery,
  useTheme,
  Box,
  MenuItem,
} from '@mui/material';
import debounce from 'lodash.debounce';

import { useMemo, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { searchSettlementsFetch } from '../../../API/searchSettlementsFetch';
import { formValidation } from './formValidation';

type Props = {
  cityName: string;
  setCityName: (value: string) => void;
  getOfficesList: (cityRef?: string) => void;
};

interface IFormValue {
  cityName: string;
}

interface ISettlement {
  DeliveryCity: string;
  Present: string;
}

const Form = ({ cityName, setCityName, getOfficesList }: Props) => {
  const [settlements, setSettlements] = useState<ISettlement[]>([]);
  const [settlementsDropdownIsShown, setSettlementsDropdownIsShown] =
    useState(false);
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)');
  const { palette } = useTheme();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormValue>();

  const onSubmit: SubmitHandler<IFormValue> = (data) => {
    getOfficesList();
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
    () => debounce(searchSettlements, 500),
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
        // rules={formValidation.cityName}
        render={({ field }) => (
          <TextField
            autoComplete="false"
            variant="outlined"
            value={cityName}
            onBlur={() => {
              // setSettlementsDropdownIsShown(false);
            }}
            onChange={(e) => {
              field.onChange(e);

              debouncedSearchSettlements(e.target.value);
              // searchSettlements(e.target.value);
              setCityName(e.target.value);
              setSettlementsDropdownIsShown(true);
            }}
            label="Місто"
            sx={{
              width: isNonMobileScreens ? '35%' : '100%',
              zIndex: 15,
            }}
            error={!!errors.cityName?.message}
            helperText={errors.cityName?.message}
          />
        )}
      />
      <Box
        sx={{
          display: settlementsDropdownIsShown ? 'block' : 'none',
          position: 'absolute',
          maxHeight: 100,
          width: isNonMobileScreens ? '35%' : '100%',
          overflowY: 'scroll',
          bgcolor: 'white',
          zIndex: 10,
          border: '1px solid rgba(0, 0, 0, 0.299)',
          borderTop: 'transparent',
          // borderRadius: '5px',
          top: '52px',
        }}
      >
        {settlements.map((settlement) => (
          <MenuItem
            key={settlement.DeliveryCity}
            value={settlement.Present}
            onClick={() => {
              console.log('++');
              setCityName(settlement.Present);
              getOfficesList(settlement.DeliveryCity);
              setSettlementsDropdownIsShown(false);
            }}
          >
            {settlement.Present}
          </MenuItem>
        ))}
      </Box>

      <Controller
        control={control}
        name="cityName"
        // rules={formValidation}
        render={({ field }) => (
          <TextField
            variant="outlined"
            // value={}
            disabled
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
        // onClick={getOfficesList}
        type="submit"
      >
        Шукати
      </Button>
    </form>
  );
};

export default Form;
