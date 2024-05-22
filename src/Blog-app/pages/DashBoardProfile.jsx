import { useLocation } from "react-router-dom";
import Profile from "../components/Profile";
import SideBar from "../components/SideBar";
import { useEffect, useState } from "react";
import Users from "../components/Users";
import Posts from "../components/Posts";
import {DashComments} from "../components/DashComments";
import DashBoard from "../components/DashBoard";

const DashBoardProfile = () => {
    const location = useLocation(); 
    const [tab, setTab] = useState("");
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get("tab")
        if (tabFromUrl) {
            setTab(tabFromUrl)
        }
    }, [location.search]);

    return (
        <div className=" flex flex-col gap-4 md:flex-row w-full mb-2 ">
            <ul className="w-full md:w-60 py-5 px-1 mt-2 dark:bg-slate-800 bg-slate-200 md:h-[80vh]">
                <SideBar/>
            </ul>
            <div className="w-full md:w-[80%] flex md:mt-16 items-center flex-col">
                {
                    tab === "profile" && <Profile />
                }
                {
                    tab === "posts" && <Posts />
                }
                {
                    tab === "users" && <Users />
                }
                 {
                    tab === "comments" && <DashComments/>
                }
                {
                    tab === "dashboard" && <DashBoard/>
                }
            </div>
        </div>
    )
}
export default DashBoardProfile;