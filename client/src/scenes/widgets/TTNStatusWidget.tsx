import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { TTNInfoFetch } from '../../API/TTNInfoFetch';
import FlexBetween from '../../components/FlexBeetwen';
import WidgetWrapper from '../../components/WidgetWrapper';
import HistoryWidget from './HistoryWidget';

type Props = {};

const initialValuesTTNInfo = {
  status: '',
  dateCreated: '',
  recipientDateTime: '',
};

const TTNStatusWidget = (props: Props) => {
  const [TTNValue, setTTNValue] = useState<string>('');
  const [TTNInfo, setTTNInfo] = useState(initialValuesTTNInfo);
  const [searchQueries, setSearchQueries] = useState<string[]>([]);
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)');
  const { palette } = useTheme();

  const getTTNInfo = async (historySearchValue: string = '') => {
    setTTNInfo(initialValuesTTNInfo);

    const result = await TTNInfoFetch(
      historySearchValue !== '' ? historySearchValue : TTNValue
    );

    if (result) {
      const { Status, DateCreated, RecipientDateTime, Number } =
        result.data.at(0);

      setTTNInfo({
        status: Status,
        dateCreated: DateCreated,
        recipientDateTime: RecipientDateTime,
      });

      historySearchValue === '' &&
        setSearchQueries((prev) => [...prev, Number]);
    }
  };

  return (
    <Box width={'80%'} margin="auto">
      <WidgetWrapper marginBottom={'2rem'}>
        <FlexBetween
          flexDirection={isNonMobileScreens ? 'row' : 'column'}
          gap="1rem"
        >
          <TextField
            variant="outlined"
            value={TTNValue}
            label="Номер ТТН"
            sx={{
              width: isNonMobileScreens ? '62%' : '100%',
            }}
            onChange={(e) => setTTNValue(e.target.value)}
          />
          <Button
            variant="contained"
            sx={{
              height: 53,
              transition: '250ms',
              width: isNonMobileScreens ? '28%' : '100%',
              '&:hover': { color: palette.background.paper },
            }}
            onClick={() => getTTNInfo()}
          >
            Отримати статус ТТН
          </Button>
        </FlexBetween>
      </WidgetWrapper>

      <Box display={isNonMobileScreens ? 'flex' : undefined} gap="6%">
        <WidgetWrapper
          marginBottom={'2rem'}
          width={isNonMobileScreens ? '64%' : '100%'}
          display="flex"
          flexDirection={'column'}
          gap="0.5rem"
        >
          <Typography variant="h4">
            <span style={{ fontWeight: 'bold' }}>Статус доставки: </span>
            {TTNInfo.status}
          </Typography>
          <Typography>
            <span style={{ fontWeight: 'bold' }}>Відправлено: </span>
            {TTNInfo.dateCreated}
          </Typography>
          <Typography>
            <span style={{ fontWeight: 'bold' }}>Отримано: </span>
            {TTNInfo.recipientDateTime}
          </Typography>
        </WidgetWrapper>

        <HistoryWidget
          setTTNValue={setTTNValue}
          getTTNInfo={getTTNInfo}
          searchQueries={searchQueries}
          setSearchQueries={setSearchQueries}
        />
      </Box>
    </Box>
  );
};

export default TTNStatusWidget;
