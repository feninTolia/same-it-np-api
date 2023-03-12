import FlexBetween from '@/components/FlexBeetwen';
import { useAppDispatch } from '@/hook';
import { setMode } from '@/store/NPSlice';
import { DarkMode, LightMode } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { SelectedPage } from '../HomePage';

import SameIT from '@/assets/sameit.png';

type Props = {
  setPageType: (value: SelectedPage) => void;
};

const NavBar = ({ setPageType }: Props) => {
  const isMobileScreens = useMediaQuery('(max-width:768px)');
  const theme = useTheme();
  const dark = theme.palette.secondary.dark;
  const dispatch = useAppDispatch();

  return (
    <FlexBetween
      mb={'2rem'}
      padding="2rem 0"
      bgcolor={theme.palette.background.paper}
    >
      <FlexBetween
        width={'80%'}
        maxWidth={'1400px'}
        m={'0 auto'}
        flexWrap="wrap"
        gap={'2rem'}
        flexDirection={isMobileScreens ? 'column-reverse' : 'row'}
      >
        <FlexBetween
          flexWrap={'wrap'}
          gap="1rem"
          width={isMobileScreens ? '100%' : 'auto'}
        >
          <Button
            variant="outlined"
            onClick={() => setPageType(SelectedPage.TTNStatus)}
            sx={{ width: isMobileScreens ? '100%' : 'auto' }}
          >
            Перевірити ТТН
          </Button>
          <Button
            variant="outlined"
            onClick={() => setPageType(SelectedPage.officesSearch)}
            sx={{ width: isMobileScreens ? '100%' : 'auto' }}
          >
            Список відділень
          </Button>
        </FlexBetween>

        <FlexBetween
          gap={'1rem'}
          mr="1rem"
          flexDirection={isMobileScreens ? 'row-reverse' : 'row'}
          width={isMobileScreens ? '100%' : 'auto'}
          // justify-content={'space-between'}
        >
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === 'dark' ? (
              <DarkMode sx={{ fontSize: '25px' }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: '25px' }} />
            )}
          </IconButton>
          <img src={SameIT} alt="logo" width={'125px'} />
        </FlexBetween>
      </FlexBetween>
    </FlexBetween>
  );
};

export default NavBar;
