import { createSlice } from '@reduxjs/toolkit';

export const companyDetailsSlice = createSlice({
  name: 'Company',
  initialState: {},
  reducers: {
    setCompanyDetails: (state, action) => {
      state.company = action.payload;
      state.value = action.payload;
    },
    Logincompany: (state, action) => {
      state.company = action.payload;
      // state.value = action.payload;
    },
    Logoutcompany: (state) => {
      state.company = null;
      state.value = null;
    },
  },
});
export const { setCompanyDetails, Logincompany, Logoutcompany } = companyDetailsSlice.actions;
export const selectCompany = (state) => state.company.company;

export default companyDetailsSlice.reducer;
