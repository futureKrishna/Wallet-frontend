import { configureStore } from '@reduxjs/toolkit';
import authReducer from './redux/authSlice'
import walletReducer from './redux/walletSlice'
import employeesReducer from './redux/employeeSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    wallet: walletReducer,
    employees: employeesReducer,
  },
});

export default store;
