import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { SetStateAction, useEffect } from 'react';
import FlexBetween from '../../../components/FlexBeetwen';
import WidgetWrapper from '../../../components/WidgetWrapper';
import { CloseOutlined } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../../hook';
import { addSearchedDocument } from '../../../store/NPSlice';

interface Props {
  setTTNValue: (value: string) => void;
  getTTNInfo: (value: string) => void;
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
  // const {} = useAppSelector((state) => state.NP.searchedDocuments);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const searchQueriesLS = localStorage.getItem('searchQueries');
    if (searchQueriesLS) {
      const parsedSearchQueriesLS = JSON.parse(searchQueriesLS);
      setSearchQueries(parsedSearchQueriesLS);
    }
  }, []);

  useEffect(() => {
    if (searchQueries.length !== 0) {
      // dispatch(addSearchedDocument({ searchedDocument: searchQueries }));
      localStorage.setItem('searchQueries', JSON.stringify(searchQueries));
    }
  }, [searchQueries]);

  return searchQueries.length !== 0 ? (
    <WidgetWrapper
      width={isNonMobileScreens ? '30%' : '100%'}
      display="flex"
      flexDirection={'column'}
      gap="0.5rem"
    >
      <FlexBetween>
        <Typography variant="h4" fontWeight={'bold'}>
          Історія
        </Typography>
        <Button
          color="error"
          onClick={() => {
            localStorage.clear();
            setSearchQueries([]);
          }}
        >
          <CloseOutlined />
        </Button>
      </FlexBetween>

      <Box sx={{ overflowY: 'scroll', maxHeight: 200 }}>
        {searchQueries.map((searchQuery, idx) => (
          <Button
            key={`${idx}-${searchQuery}`}
            onClick={() => {
              setTTNValue(searchQuery);
              getTTNInfo(searchQuery);
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
  ) : null;
};

export default HistoryWidget;
