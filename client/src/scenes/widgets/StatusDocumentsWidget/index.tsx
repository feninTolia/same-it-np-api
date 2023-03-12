import { useState } from 'react';
import { useAppDispatch } from '@/hook';
import { addSearchedDocument } from '@/store/NPSlice';
import { getStatusDocumentsFetch } from '@/API/getStatusDocumentsFetch';
import { Box, useMediaQuery } from '@mui/material';
import HistoryWidget from '../HistoryWidget';
import Form from './Form';
import StatusInfoWidget from '../StatusInfoWidget';
import { IInitialValuesStatusDocument } from '@/shared/types';

import { ToastContainer } from 'react-toastify';
import { notify } from '@/helpers/toastEmmiter';
import 'react-toastify/dist/ReactToastify.css';

const initialValuesStatusDocument: IInitialValuesStatusDocument = {
  status: '',
  dateCreated: '',
  recipientDateTime: '',
};

const StatusDocumentsWidget = () => {
  const [documentNumber, setDocumentNumber] = useState<string>('');
  const [statusDocument, setStatusDocument] = useState(
    initialValuesStatusDocument
  );
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)');
  const dispatch = useAppDispatch();

  const getStatusDocuments = async (searchValue: string = '') => {
    setStatusDocument(initialValuesStatusDocument);

    const result = await getStatusDocumentsFetch(
      searchValue !== '' ? searchValue : documentNumber
    );

    if (result) {
      if (result.data.at(0).StatusCode === '3') notify();

      const { Status, DateCreated, RecipientDateTime, Number } =
        result.data.at(0);

      setStatusDocument({
        status: Status,
        dateCreated: DateCreated,
        recipientDateTime: RecipientDateTime,
      });

      searchValue === '' &&
        dispatch(addSearchedDocument({ searchedDocument: Number }));
    } else notify('Документ не знайдений');
  };

  return (
    <Box width={'80%'} margin="auto" maxWidth={'1400px'}>
      <Form
        documentNumber={documentNumber}
        setDocumentNumber={setDocumentNumber}
        getStatusDocuments={getStatusDocuments}
      />
      <Box
        display={isNonMobileScreens ? 'flex' : undefined}
        gap="6%"
        alignItems={'flex-start'}
      >
        <StatusInfoWidget statusDocument={statusDocument} />

        <HistoryWidget
          setDocumentNumber={setDocumentNumber}
          getStatusDocuments={getStatusDocuments}
        />
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default StatusDocumentsWidget;
