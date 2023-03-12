import { Box, Typography, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { getStatusDocumentsFetch } from '@/API/getStatusDocumentsFetch';
import WidgetWrapper from '@/components/WidgetWrapper';
import { useAppDispatch } from '@/hook';
import { addSearchedDocument } from '@/store/NPSlice';
import HistoryWidget from '../HistoryWidget';
import Form from './Form';
import StatusWidget from './StatusWidget';
import { IInitialValuesStatusDocument } from '@/shared/types';

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
      const { Status, DateCreated, RecipientDateTime, Number } =
        result.data.at(0);

      setStatusDocument({
        status: Status,
        dateCreated: DateCreated,
        recipientDateTime: RecipientDateTime,
      });

      searchValue === '' &&
        dispatch(addSearchedDocument({ searchedDocument: Number }));
    }
  };

  return (
    <Box width={'80%'} margin="auto">
      {/* TTN Search */}
      <WidgetWrapper marginBottom={'2rem'}>
        <Form
          documentNumber={documentNumber}
          setDocumentNumber={setDocumentNumber}
          getStatusDocuments={getStatusDocuments}
        />
      </WidgetWrapper>

      <Box
        display={isNonMobileScreens ? 'flex' : undefined}
        gap="6%"
        alignItems={'flex-start'}
      >
        <StatusWidget statusDocument={statusDocument} />

        <HistoryWidget
          setDocumentNumber={setDocumentNumber}
          getStatusDocuments={getStatusDocuments}
        />
      </Box>
    </Box>
  );
};

export default StatusDocumentsWidget;
