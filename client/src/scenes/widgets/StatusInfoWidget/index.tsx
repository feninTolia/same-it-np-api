import WidgetWrapper from '@/components/WidgetWrapper';
import { IInitialValuesStatusDocument } from '@/shared/types';
import { Typography, useMediaQuery } from '@mui/material';

type Props = {
  statusDocument: IInitialValuesStatusDocument;
};

const StatusInfoWidget = ({ statusDocument }: Props) => {
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)');
  return (
    <WidgetWrapper
      marginBottom={'2rem'}
      width={isNonMobileScreens ? '64%' : '100%'}
      display="flex"
      flexDirection={'column'}
      gap="0.5rem"
    >
      <Typography variant="h4" mb={'1rem'}>
        <span style={{ fontWeight: 'bold' }}>Статус доставки: </span>
        {statusDocument.status}
      </Typography>
      <Typography variant="h5" mb={'0.5rem'}>
        <span style={{ fontWeight: 'bold' }}>Відправлено: </span>
        {statusDocument.dateCreated}
      </Typography>
      <Typography variant="h5" mb={'1rem'}>
        <span style={{ fontWeight: 'bold' }}>Отримано: </span>
        {statusDocument.recipientDateTime}
      </Typography>
    </WidgetWrapper>
  );
};

export default StatusInfoWidget;
