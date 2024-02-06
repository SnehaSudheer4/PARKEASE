import { createSlice } from '@reduxjs/toolkit';

export const securityDetailsSlice = createSlice({
  name: 'Security',
  initialState: {},
  reducers: {
    setSecurityDetails: (state, action) => {
      state.value = action.payload;
      state.security=action.payload;
    },
    loginSecurity: (state, action) => {
      state.security = action.payload;
    },
    logoutSecurity: (state) => {
        
        state.security = null;
        state.value = null;
  
    },
  },
});
export const { setSecurityDetails, logoutSecurity, loginSecurity } = securityDetailsSlice.actions;
export const selectSecurity = (state) => state.security.security;
export default securityDetailsSlice.reducer;
