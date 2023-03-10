import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { getTTNInfo } from '../../API/getTTNInfo';
import FlexBetween from '../../components/FlexBeetwen';
import WidgetWrapper from '../../components/WidgetWrapper';

type Props = {};

const initialValuesTTNInfo = {
  status: '',
  dateCreated: '',
  recipientDateTime: '',
};
//  20450664824930
const TTNStatusWidget = (props: Props) => {
  const [TTNValue, setTTNValue] = useState<string>('');
  const [TTNInfo, setTTNInfo] = useState(initialValuesTTNInfo);
  const [searchQueries, setSearchQueries] = useState<string[]>([]);
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)');
  const { palette } = useTheme();

  const getTTNInfoHandler = async (updateHistory: boolean = true) => {
    setTTNInfo(initialValuesTTNInfo);

    const result = await getTTNInfo(TTNValue);
    console.log(result);

    if (result) {
      const { Status, DateCreated, RecipientDateTime, Number } =
        result.data.at(0);

      setTTNInfo({
        status: Status,
        dateCreated: DateCreated,
        recipientDateTime: RecipientDateTime,
      });
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
            onClick={() => getTTNInfoHandler()}
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

        <WidgetWrapper
          width={isNonMobileScreens ? '30%' : '100%'}
          display="flex"
          flexDirection={'column'}
          gap="0.5rem"
        >
          <Typography variant="h4" fontWeight={'bold'}>
            Історія
          </Typography>

          <Box sx={{ overflowY: 'scroll', maxHeight: 200 }}>
            {searchQueries.map((searchQuery, idx) => (
              <Button
                onClick={() => {
                  setTTNValue(searchQuery);
                  getTTNInfoHandler(false);
                }}
              >
                <Typography
                  key={`${idx}-${searchQuery}`}
                  sx={{
                    transition: '200ms',
                    '&:hover': {
                      color: palette.primary.main,
                      cursor: 'pointer',
                    },
                  }}
                >
                  {searchQuery}
                </Typography>
              </Button>
            ))}
          </Box>
        </WidgetWrapper>
      </Box>
    </Box>
  );
};

export default TTNStatusWidget;
