const { useSelector } = require("react-redux");
const { Outlet, Navigate } = require("react-router-dom");

export const PrivateRoute = ()=>{
    const {data} = useSelector(state=>state.auth);  
    const user = data?.user?.userName;   
    return user ? (<Outlet/>):(<Navigate to="/sign-up"/>);
}