import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mainWalletBalance: 0,
  employeeWallets: [],
  myWalletEmployees:[],
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setMainWallet: (state, action) => {
      state.mainWalletBalance = action.payload;
    },
    updateEmployeeWallet: (state, action) => {
      state.employeeWallets = action.payload;
    },
    setMyWalletEmployees: (state, action) => {
      state.myWalletEmployees = action.payload;
    },
  },
});

export const { setMainWallet, updateEmployeeWallet,setMyWalletEmployees } = walletSlice.actions;
export default walletSlice.reducer;
