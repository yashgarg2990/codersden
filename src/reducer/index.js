import { combineReducers } from "@reduxjs/toolkit";

import authSlice from "../slices/authSlice";
import profileReducer from "../slices/profileSlice";
import cartReducer from "../slices/cartSlice"
import courseReducer from "../slices/courseSlice"



const rootReducer  = combineReducers({
    auth: authSlice,
    profile:profileReducer,
    cart:cartReducer,
    course:courseReducer,
})

export default rootReducer