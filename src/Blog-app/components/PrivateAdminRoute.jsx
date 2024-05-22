import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateAdminRoute = ()=>{
    const {data} = useSelector(state=>state.auth); 
    return (
         data?.user?.isAdmin ?<Outlet/>:<Navigate to={"sign-in"}/>
    )
}
export default PrivateAdminRoute;