import { Button, TextField, useMediaQuery, useTheme, Box } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { formValidation } from './formValidation';

type Props = {
  cityName: string;
  setCityName: (value: string) => void;
  getOfficesList: () => void;
};

interface IFormValue {
  cityName: string;
}

const Form = ({ cityName, setCityName, getOfficesList }: Props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormValue>();
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)');
  const { palette } = useTheme();

  const onSubmit: SubmitHandler<IFormValue> = (data) => {
    getOfficesList();
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
      }}
    >
      <Controller
        control={control}
        name="cityName"
        rules={formValidation.cityName}
        render={({ field }) => (
          <TextField
            variant="outlined"
            value={cityName}
            onChange={(e) => {
              field.onChange(e);
              setCityName(e.target.value);
            }}
            label="Місто"
            sx={{
              width: isNonMobileScreens ? '35%' : '100%',
            }}
            error={!!errors.cityName?.message}
            helperText={errors.cityName?.message}
          />
        )}
      />

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
