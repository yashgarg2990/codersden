import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    signupData: null,
    loading: false,
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    datadone  : false,
  };
const authSlice = createSlice({
    name:"auth", 
    initialState: initialState, 
    reducers:{ 
        setToken(state , actions){
            state.token = actions.payload
        },
        setSignupData(state, value) {
            state.signupData = value.payload;
          },
          setLoading(state, value) {
            state.loading = value.payload;
          },
          setdatadone(state , action) {
            state.datadone = action.payload
          }
    },
})

export const {  setToken  , setSignupData , setLoading , setdatadone} = authSlice.actions;

export default authSlice.reducer;