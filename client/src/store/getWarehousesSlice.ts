import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WareHouse {
  CityName: string;
  CityRef: string;
}

interface GetWarehousesState {
  wareHousesSelect: WareHouse;
  wareHousesInput: WareHouse;
}

const initialState: GetWarehousesState = {
  wareHousesSelect: { CityName: '', CityRef: '' },
  wareHousesInput: { CityName: '', CityRef: '' },
};

const getWarehousesSlice = createSlice({
  name: 'getWarehouses',
  initialState,
  reducers: {
    addSelectCity(
      state,
      action: PayloadAction<{ CityRef: string; CityName: string }>
    ) {
      state.wareHousesSelect.CityRef = action.payload.CityRef;
      state.wareHousesSelect.CityName = action.payload.CityName;
    },

    addInputCity(
      state,
      action: PayloadAction<{ CityRef: string; CityName: string }>
    ) {
      state.wareHousesInput.CityRef = action.payload.CityRef;
      state.wareHousesInput.CityName = action.payload.CityName;
    },
  },
});

export const { addSelectCity, addInputCity } = getWarehousesSlice.actions;

export default getWarehousesSlice.reducer;
