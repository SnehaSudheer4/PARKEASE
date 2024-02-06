import {createSlice} from '@reduxjs/toolkit'
export const userDetailsSlice = createSlice({
name:'user',
initialState:{ },
reducers:{
    setUserDetails:(state,action)=>{
        state.value=action.payload;
        state.user = action.payload;
    },
   
    login:(state,action)=>{
        state.user =action.payload;
    },
    logout:(state)=>{
        state.value = null;
        state.user = null;
    }
}
})
export const {login,logout,setUserDetails}=userDetailsSlice.actions
export const selectUser=(state)=>state.user.user;
export default userDetailsSlice.reducer