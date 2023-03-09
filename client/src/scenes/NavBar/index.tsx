import { Box, Button, useMediaQuery, useTheme } from '@mui/material';
import { SelectedPage } from '../HomePage';

type Props = {
  setPageType: (value: SelectedPage) => void;
};

const NavBar = ({ setPageType }: Props) => {
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)');
  const { palette } = useTheme();

  return (
    <Box
      mb={'2rem'}
      padding="2rem 10%"
      gap="1rem"
      display={'flex'}
      flexWrap="wrap"
      bgcolor={palette.background.paper}
    >
      <Button
        variant="outlined"
        onClick={() => setPageType(SelectedPage.TTNStatus)}
      >
        Перевірити ТТН
      </Button>
      <Button
        variant="outlined"
        onClick={() => setPageType(SelectedPage.officesSearch)}
      >
        Список відділень
      </Button>
    </Box>
  );
};

export default NavBar;
