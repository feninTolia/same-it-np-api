import { Box } from '@mui/material';
import { useState } from 'react';
import NavBar from '../../scenes/NavBar';
import SearchOfficesWidget from '../widgets/SearchOfficesWidget';
import TTNStatusWidget from '../widgets/TTNStatusWidget';

export enum SelectedPage {
  TTNStatus = 'TTNStatus',
  officesSearch = 'officesSearch',
}

const HomePage = () => {
  const [pageType, setPageType] = useState<SelectedPage>(
    SelectedPage.TTNStatus
  );

  return (
    <Box>
      <NavBar setPageType={setPageType} />

      {pageType === SelectedPage.TTNStatus ? (
        <TTNStatusWidget />
      ) : (
        <SearchOfficesWidget />
      )}
    </Box>
  );
};

export default HomePage;
