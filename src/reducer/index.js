import { combineReducers } from "@reduxjs/toolkit";

import authSlice from "../slices/authSlice";
import profileReducer from "../slices/profileSlice";
import cartReducer from "../slices/cartSlice"



const rootReducer  = combineReducers({
    auth: authSlice,
    profile:profileReducer,
    cart:cartReducer,
  
})

export default rootReducer