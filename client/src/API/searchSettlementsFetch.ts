const API_KEY = '47bebc438b872c9c970902470e6eaba0';

export const searchSettlementsFetch = async (CityName: string) => {
  const requestBody = {
    apiKey: API_KEY,
    modelName: 'Address',
    calledMethod: 'searchSettlements',
    methodProperties: {
      CityName,
      Limit: '10',
      Page: '1',
    },
  };

  const response = await fetch('https://api.novaposhta.ua/v2.0/json/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  });
  const result = await response.json();

  if (result.success) {
    console.log('searchSettlementsFetch.result.data', result.data);
    return result.data;
  }
};
