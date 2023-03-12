const API_KEY = '47bebc438b872c9c970902470e6eaba0';

interface searchValues {
  CityName?: string;
  CityRef?: string;
  WarehouseId?: string;
}

export const getWarehousesFetch = async ({
  CityName,
  CityRef,
  WarehouseId = '',
}: searchValues) => {
  console.log({ CityName, CityRef });

  const requestBody = {
    apiKey: API_KEY,
    modelName: 'Address',
    calledMethod: 'getWarehouses',
    methodProperties: {
      CityName: CityRef ? '' : CityName,
      CityRef,
      Language: 'UA',
      WarehouseId: WarehouseId,
    },
  };

  const response = await fetch('https://api.novaposhta.ua/v2.0/json/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  });
  const result = await response.json();

  if (result.data.length !== 0) {
    return result.data;
  }
};
