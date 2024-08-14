import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Dashboard/Sidebar'

function Dashboard() {
    const {loading : authLoading} = useSelector((state)=> state.auth)
    const { loading :  profileLoading} =  useSelector((state)=> state.profile)
    if(authLoading ||  profileLoading) {
        return(
            <div className='spinner'>

            </div>
        )
   
    }
  return (
    <div className=' h-screen relative flex  gap-x-8'>
      <Sidebar/>
      <div className='h-[calc(100vh - 3.5rem)] overflow-auto w-4/5 sm:w-full'>
        <div className='mx-6 w-11/12  py-10'>
        <Outlet/>
        </div>
      </div>
     
    </div>
  )
}

export default Dashboard
