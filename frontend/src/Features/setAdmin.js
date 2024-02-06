import {createSlice} from '@reduxjs/toolkit';
export const adminDetailsSlice = createSlice({
name:'Admin',
initialState:{ },
reducers:{

    setAdminDetails:(state,action)=>{
        state.value=action.payload
    },
    LoginAdmin:(state,action)=>{
        state.admin=action.payload;
    },
    LogoutAdmin:(state)=>{
        state.admin= null;
        state.value = null;
    }
}
})
export const {setAdminDetails,LoginAdmin,LogoutAdmin}=adminDetailsSlice.actions;
export const selectAdmin=(state)=>state.admin
export default adminDetailsSlice.reducer