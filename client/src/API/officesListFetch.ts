const API_KEY = '47bebc438b872c9c970902470e6eaba0';

export const officesListFetch = async (CityName: string) => {
  const requestBody = {
    apiKey: API_KEY,
    modelName: 'Address',
    calledMethod: 'getWarehouses',
    methodProperties: {
      CityName,
      Language: 'UA',
    },
  };

  const response = await fetch('https://api.novaposhta.ua/v2.0/json/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  });
  const result = await response.json();

  if (result.success) {
    return result.data;
  }
};
