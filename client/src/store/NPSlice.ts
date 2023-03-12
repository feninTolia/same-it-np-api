import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WareHouse {
  CityName: string;
  CityRef: string;
}

interface IState {
  wareHousesSelect: WareHouse;
  searchedDocuments: string[];
}

const initialState: IState = {
  wareHousesSelect: { CityName: '', CityRef: '' },
  searchedDocuments: [],
};

const NPSlice = createSlice({
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
    addSearchedDocument(
      state,
      action: PayloadAction<{ searchedDocument: string }>
    ) {
      state.searchedDocuments.push(action.payload.searchedDocument);
    },
  },
});

export const { addSelectCity, addSearchedDocument } = NPSlice.actions;

export default NPSlice.reducer;
