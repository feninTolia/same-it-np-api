import {
  Box,
  useMediaQuery,
  Button,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';
import NavBar from '../../scenes/NavBar';
import FlexBetween from '../../components/FlexBeetwen';
import WidgetWrapper from '../../components/WidgetWrapper';
import StickyHeadTable from './table';

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)');
  const { palette } = useTheme();

  return (
    <Box>
      <NavBar />
      <Box width={'80%'} margin="auto">
        <WidgetWrapper marginBottom={'2rem'}>
          <FlexBetween
            flexDirection={isNonMobileScreens ? 'row' : 'column'}
            gap="1rem"
          >
            <TextField
              variant="outlined"
              // value={TTNValue}
              label="Номер ТТН"
              sx={{
                width: isNonMobileScreens ? '62%' : '100%',
              }}
              // onChange={(e) => setTTNValue(e.target.value)}
            />
            <Button
              variant="contained"
              sx={{
                height: 53,
                transition: '250ms',
                width: isNonMobileScreens ? '28%' : '100%',
                '&:hover': { color: palette.background.paper },
              }}
              // onClick={getTTNInfo}
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
              {/* {TTNInfo.status} */}
            </Typography>
            <Typography>
              <span style={{ fontWeight: 'bold' }}>Відправлено: </span>
              {/* {TTNInfo.dateCreated} */}
            </Typography>
            <Typography>
              <span style={{ fontWeight: 'bold' }}>Отримано: </span>
              {/* {TTNInfo.recipientDateTime} */}
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
            <Typography
              sx={{
                transition: '200ms',
                '&:hover': { color: palette.primary.main, cursor: 'pointer' },
              }}
            >
              20450664824930
            </Typography>
            <Typography
              sx={{
                transition: '200ms',
                '&:hover': { color: palette.primary.main, cursor: 'pointer' },
              }}
            >
              20450664824930
            </Typography>
            <Typography
              sx={{
                transition: '200ms',
                '&:hover': { color: palette.primary.main, cursor: 'pointer' },
              }}
            >
              20450664824930
            </Typography>
            <Typography
              sx={{
                transition: '200ms',
                '&:hover': { color: palette.primary.main, cursor: 'pointer' },
              }}
            >
              20450664824930
            </Typography>
          </WidgetWrapper>
        </Box>
      </Box>

      <Box width={'80%'} margin="auto">
        <WidgetWrapper
          display={'flex'}
          flexWrap="wrap"
          gap={'1rem'}
          justifyContent="space-between"
        >
          <Typography width={'100%'} variant="h3">
            Пошук відділення за номером або за населеним пунктом
          </Typography>
          <TextField
            variant="outlined"
            // value={TTNValue}
            label="Місто"
            sx={{
              width: isNonMobileScreens ? '35%' : '100%',
            }}
          />
          <TextField
            variant="outlined"
            // value={TTNValue}
            disabled
            label="№ відділення"
            sx={{
              width: isNonMobileScreens ? '35%' : '100%',
            }}
          />
          <Button
            variant="contained"
            sx={{
              height: 53,
              transition: '250ms',
              width: isNonMobileScreens ? '20%' : '100%',
              '&:hover': { color: palette.background.paper },
            }}
            // onClick={getTTNInfo}
          >
            Шукати
          </Button>

          <StickyHeadTable />
        </WidgetWrapper>
      </Box>
    </Box>
  );
};

export default HomePage;