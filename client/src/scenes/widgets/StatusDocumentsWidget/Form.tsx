import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { formValidation } from './formValidation';
import {
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import FlexBetween from '@/components/FlexBeetwen';
import WidgetWrapper from '@/components/WidgetWrapper';

interface Props {
  documentNumber: string;
  setDocumentNumber: (value: string) => void;
  getStatusDocuments: (searchedDocument?: string) => void;
}

interface IFormValue {
  inputValue: string;
}

const Form = ({
  documentNumber,
  setDocumentNumber,
  getStatusDocuments,
}: Props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormValue>({ values: { inputValue: documentNumber } });

  const isNonMobileScreens = useMediaQuery('(min-width:1000px)');
  const { palette } = useTheme();

  const onSubmit: SubmitHandler<IFormValue> = (data) => {
    getStatusDocuments();
  };

  return (
    <WidgetWrapper marginBottom={'2rem'}>
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
                  setDocumentNumber(e.target.value);
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
            <Typography>Отримати статус ТТН</Typography>
          </Button>
        </FlexBetween>
      </form>
    </WidgetWrapper>
  );
};

export default Form;
