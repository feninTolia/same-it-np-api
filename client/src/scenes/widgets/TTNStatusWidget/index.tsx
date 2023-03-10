import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { TTNInfoFetch } from '../../../API/TTNInfoFetch';
import FlexBetween from '../../../components/FlexBeetwen';
import WidgetWrapper from '../../../components/WidgetWrapper';
import HistoryWidget from '../HistoryWidget';
import Form from './Form';

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
      {/* TTN Search */}
      <WidgetWrapper marginBottom={'2rem'}>
        <Form
          TTNValue={TTNValue}
          setTTNValue={setTTNValue}
          getTTNInfo={getTTNInfo}
        />
      </WidgetWrapper>

      {/* info widget */}
      <Box
        display={isNonMobileScreens ? 'flex' : undefined}
        gap="6%"
        alignItems={'flex-start'}
      >
        <WidgetWrapper
          marginBottom={'2rem'}
          width={isNonMobileScreens ? '64%' : '100%'}
          display="flex"
          flexDirection={'column'}
          gap="0.5rem"
        >
          <Typography variant="h4" mb={'1rem'}>
            <span style={{ fontWeight: 'bold' }}>Статус доставки: </span>
            {TTNInfo.status}
          </Typography>
          <Typography variant="h5" mb={'0.5rem'}>
            <span style={{ fontWeight: 'bold' }}>Відправлено: </span>
            {TTNInfo.dateCreated}
          </Typography>
          <Typography variant="h5" mb={'1rem'}>
            <span style={{ fontWeight: 'bold' }}>Отримано: </span>
            {TTNInfo.recipientDateTime}
          </Typography>
        </WidgetWrapper>

        {/* History Widget */}
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
