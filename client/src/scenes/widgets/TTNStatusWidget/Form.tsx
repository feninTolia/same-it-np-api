import {
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import FlexBetween from '../../../components/FlexBeetwen';
import { formValidation } from './formValidation';

interface Props {
  TTNValue: string;
  setTTNValue: (value: string) => void;
  getTTNInfo: (historySearchValue?: string) => void;
}

interface IFormValue {
  inputValue: string;
}

const Form = ({ TTNValue, setTTNValue, getTTNInfo }: Props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormValue>({ values: { inputValue: TTNValue } });
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)');
  const { palette } = useTheme();

  const onSubmit: SubmitHandler<IFormValue> = (data) => {
    getTTNInfo();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FlexBetween
        flexDirection={isNonMobileScreens ? 'row' : 'column'}
        gap="1rem"
      >
        <Controller
          control={control}
          name="inputValue"
          rules={formValidation}
          render={({ field }) => (
            <TextField
              variant="outlined"
              label="Номер ТТН"
              sx={{
                width: isNonMobileScreens ? '62%' : '100%',
              }}
              onChange={(e) => {
                field.onChange(e);
                setTTNValue(e.target.value);
              }}
              value={field.value}
              error={!!errors.inputValue?.message}
              helperText={errors.inputValue?.message}
            />
          )}
        />

        <Button
          variant="contained"
          sx={{
            height: 53,
            transition: '250ms',
            width: isNonMobileScreens ? '28%' : '100%',
            '&:hover': { color: palette.background.paper },
          }}
          type="submit"
        >
          <Typography variant="h5">Отримати статус ТТН</Typography>
        </Button>
      </FlexBetween>
    </form>
  );
};

export default Form;
