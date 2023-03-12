import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import FlexBetween from '@/components/FlexBeetwen';
import WidgetWrapper from '@/components/WidgetWrapper';
import { CloseOutlined } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/hook';
import { deleteSearchedDocuments } from '@/store/NPSlice';

interface Props {
  setTTNValue: (value: string) => void;
  getTTNInfo: (value: string) => void;
}

const HistoryWidget = ({ setTTNValue, getTTNInfo }: Props) => {
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)');
  const { palette } = useTheme();

  const searchedDocuments = useAppSelector((state) => state.searchedDocuments);
  const dispatch = useAppDispatch();

  return searchedDocuments.length !== 0 ? (
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
            dispatch(deleteSearchedDocuments());
          }}
        >
          <CloseOutlined />
        </Button>
      </FlexBetween>

      <Box sx={{ overflowY: 'scroll', maxHeight: 200 }}>
        {searchedDocuments.map((searchedDocument, idx) => (
          <Button
            key={`${idx}-${searchedDocument}`}
            onClick={() => {
              setTTNValue(searchedDocument);
              getTTNInfo(searchedDocument);
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
              {searchedDocument}
            </Typography>
          </Button>
        ))}
      </Box>
    </WidgetWrapper>
  ) : null;
};

export default HistoryWidget;
