import { configureStore } from '@reduxjs/toolkit';
import getWarehousesReducer from './getWarehousesSlice';

const store = configureStore({
  reducer: {
    getWarehouses: getWarehousesReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
