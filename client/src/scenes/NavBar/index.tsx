import { Box, Button, useMediaQuery, useTheme } from '@mui/material';

type Props = {};

const NavBar = (props: Props) => {
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
      <Button variant="outlined" onClick={() => {}}>
        Перевірити ТТН
      </Button>
      <Button variant="outlined" onClick={() => {}}>
        Список відділень
      </Button>
    </Box>
  );
};

export default NavBar;
