import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios";
import { signOutFailare, signOutStart, signOutSuccess } from "../store/AuthSlice";
import { BaseURL } from "../constants";
import { useState } from "react";
const SideBar = () => {
    const { data } = useSelector(state => state.auth);
    const [activeBG,setActiveBG] = useState("profile") 
    const linkData = [
        {
            id:4,value:"dashboard",icon:"fa-dashboard"
        },
        {
            id:1,value:"posts",icon:"fa-envelope"
        }, 
        {
            id:2,value:"users",icon:"fa-users"
        },
        {
            id:3,value:"comments",icon:"fa-message"
        }
    ];
    const dispatch = useDispatch()
    const handleSignOut = async () => {
        try {
            dispatch(signOutStart(true))
            const { data } = await axios.patch(`${BaseURL}/user/sign-out`, { withCredentials: true });
            setTimeout(() => {
                dispatch(signOutSuccess(data?.message));  
            }, 500);
            setTimeout(() => {
                dispatch(signOutSuccess(""));
            }, 500);
        } catch (error) {
            dispatch(signOutFailare(error?.response?.data?.message)) 
            console.log(error);
        }
    }
    const handleActive = (value)=>{    
            setActiveBG(value) 
    } 
    return (
        <>
            <Link to="/dashboard?tab=profile" onClick={(e)=>handleActive("profile")}>
                <li className={`flex justify-between rounded-sm hover:bg-slate-100
                 dark:hover:bg-slate-700 transition-all py-1 px-[2px] ${activeBG === "profile" && "dark:bg-slate-700 bg-slate-100"}`}>
                    <div className="flex items-center gap-4">
                        <i className="fas fa-user text-[18px] w-8 text-center "></i>
                        <span className="font-semibold">Profile</span>
                    </div>
                    <span className="bg-slate-950 text-white px-2 rounded-[4px]">{data?.user?.isAdmin ? "Admin" : "user"}</span>
                </li>
            </Link>
            {
                data?.user?.isAdmin && (
                    linkData?.map((link) => (
                        <Link to={`/dashboard?tab=${link?.value}`} key={link.id}>
                            <li className={`flex justify-between rounded-sm hover:bg-slate-100 ${activeBG === link?.value && "dark:bg-slate-700 bg-slate-100"} dark:hover:bg-slate-700 transition-all py-1 px-[2px]`} onClick={(e)=>handleActive(link?.value)}>
                                <div className="flex items-center gap-4">
                                    <i className={`fas ${link.icon} text-[18px] w-8 text-center`}></i>
                                    <span className="font-semibold capitalize">{link.value}</span>
                                </div>
                            </li>
                        </Link>
                    )) 
                )
            } 
                <li onClick={handleSignOut} className="cursor-pointer rounded-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-all py-1 px-[2px]">
                    <div className="flex items-center gap-4">
                        <i className="fas fa-arrow-right text-[18px] w-8 text-center "></i>
                        <span className="font-semibold">Sign Out</span>
                    </div>
                </li> 
        </>
    )
}
export default SideBar