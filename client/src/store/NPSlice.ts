import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WareHouse {
  CityName: string;
  CityRef: string;
}

interface IState {
  wareHousesSelect: WareHouse;
  searchedDocuments: string[];
  mode: 'light' | 'dark';
  isLoading: boolean;
}

const initialState: IState = {
  wareHousesSelect: { CityName: '', CityRef: '' },
  searchedDocuments: [],
  mode: 'light',
  isLoading: false,
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
    deleteSearchedDocuments(state) {
      state.searchedDocuments = [];
    },
    setMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  addSelectCity,
  addSearchedDocument,
  deleteSearchedDocuments,
  setMode,
  setIsLoading,
} = NPSlice.actions;

export default NPSlice.reducer;
