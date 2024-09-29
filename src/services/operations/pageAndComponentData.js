import React from 'react'
import {toast} from "react-hot-toast"
import { apiConnector } from '../apiconnector';
import { catalogData } from "../apis";

export const getCatalogPageData = async(categoryId) => {
    const toastId = toast.loading("Loading...")
    let result = [] ;
    try{
        console.log("enterimng getcatalogpage data function in frontnrd ")
        const response = await apiConnector("POST" , catalogData.CATALOGPAGEDATA_API , {CategoryId :  categoryId})
          
        if(!response?.data?.success){ throw new Error("Could not Fetch Category page data");}
           
          console.log("operations wale k respone " ,response)
         result = response?.data;
    }
    catch(error) {
        toast.error(error.message) 
        result = error.response?.data
    }
    toast.dismiss(toastId)
    return result;
}