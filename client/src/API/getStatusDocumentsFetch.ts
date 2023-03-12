export const getStatusDocumentsFetch = async (documentNumber: string) => {
  const requestBody = {
    apiKey: import.meta.env.NP_API_KEY,
    modelName: 'TrackingDocument',
    calledMethod: 'getStatusDocuments',
    methodProperties: {
      Documents: [
        {
          DocumentNumber: documentNumber,
        },
      ],
    },
  };

  const response = await fetch('https://api.novaposhta.ua/v2.0/json/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  });
  const result = await response.json();

  if (result.success) {
    return result;
  }
};
