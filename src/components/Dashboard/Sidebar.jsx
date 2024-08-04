import React, { useEffect } from 'react';
import { logout } from "../../services/operations/authAPI";
import { sideBarLinks } from "../../Data/SidebarLinks";
import { useDispatch, useSelector } from 'react-redux';
import SidebarLink from './SidebarLink';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { VscSignOut } from 'react-icons/vsc';
import ConfirmationModal from '../ConfirmationModal';

function Sidebar() {
    const { loading: profileLoading, user } = useSelector((state) => state.profile);
    const { loading: authLoading } = useSelector((state) => state.auth);
    const [confirmationModal, setConfirmationModal] = useState(null)
    const navigate = useNavigate()
    const dispatch= useDispatch()

    useEffect(() => {
        console.log(user);
    }, [user]);

    if (profileLoading || authLoading) {
        return (
            <div className='spinner'>
                {/* You can add a spinner or loading indicator here */}
            </div>
        );
    }

    return (
        <div className='flex min-w-[140px] flex-col border-r-[1px] border-r-richblack-400 h-[calc(100vh - 3.5rem)] bg-richblack-800 py-10'>
            <div className='flex flex-col'>
                {sideBarLinks.map((link) => {
                    if (link.type && user?.AccountType !== link.type) return null;
                    return (
                        <SidebarLink key={link.id} link={link} iconName={link.icon} />
                    );
                })}
            </div>
            <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />
            <div className='flex flex-col '>
                <SidebarLink link={{name:"Settings" , path: "/dashboard/settings"}} iconName="VscSettingsGear" />
                <button 
                onClick={() =>
                    setConfirmationModal({
                        text1: "Are you sure?",
                        text2: "You will be logged out of your account.",
                        btn1Text: "Logout",
                        btn2Text: "Cancel",
                        btn1Handler: () => dispatch(logout(navigate)),
                        btn2Handler: () => setConfirmationModal(null),
                      })
                }
                >
                       <div className="flex items-center gap-x-2 relative px-8 py-2 text-base font-medium text-richblack-300">
                           <VscSignOut className="text-lg" />
                            <span>Logout</span>
                             </div>
                    </button>
            </div>
            {confirmationModal && <ConfirmationModal modalData = {confirmationModal}/>}
        </div>
    );
}

export default Sidebar;
