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
    <div className=' h-screen relative flex '>
      <Sidebar/>
      <div className='h-[calc(100vh - 3.5rem)] overflow-auto'>
        <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
        <Outlet/>
        </div>
      </div>
     
    </div>
  )
}

export default Dashboard
