import { Box } from '@mui/material';
import { useState } from 'react';
import NavBar from '@/scenes/NavBar';
import GetWarehousesWidget from '../widgets/GetWarehousesWidget';
import StatusDocumentsWidget from '../widgets/StatusDocumentsWidget';

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
        <StatusDocumentsWidget />
      ) : (
        <GetWarehousesWidget />
      )}
    </Box>
  );
};

export default HomePage;
