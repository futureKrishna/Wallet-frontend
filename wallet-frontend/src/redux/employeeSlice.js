import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  myEmployees: [],
  allUsers: [],
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setMyEmployees: (state, action) => {
      state.myEmployees = action.payload;
    },
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
  },
});

export const { setMyEmployees, setAllUsers } = employeeSlice.actions;
export default employeeSlice.reducer;
