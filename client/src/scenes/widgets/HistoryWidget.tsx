import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { SetStateAction, useEffect } from 'react';
import WidgetWrapper from '../../components/WidgetWrapper';

interface Props {
  setTTNValue: (value: string) => void;
  getTTNInfo: (value: boolean) => void;
  searchQueries: string[];
  setSearchQueries: (value: SetStateAction<string[]>) => void;
}

const HistoryWidget = ({
  setTTNValue,
  getTTNInfo,
  searchQueries,
  setSearchQueries,
}: Props) => {
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)');
  const { palette } = useTheme();

  useEffect(() => {
    const searchQueriesLS = localStorage.getItem('searchQueries');
    if (searchQueriesLS) {
      const parsedSearchQueriesLS = JSON.parse(searchQueriesLS);
      setSearchQueries(parsedSearchQueriesLS);
    }
  }, []);

  useEffect(() => {
    if (searchQueries.length !== 0) {
      localStorage.setItem('searchQueries', JSON.stringify(searchQueries));
    }
  }, [searchQueries]);

  return (
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
            key={`${idx}-${searchQuery}`}
            onClick={() => {
              setTTNValue(searchQuery);
              getTTNInfo(false);
            }}
          >
            <Typography
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
  );
};

export default HistoryWidget;
