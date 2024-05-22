import axios from "axios";
import { useState } from "react";
import { BaseURL } from "../constants";
import { useNavigate, useParams } from "react-router-dom";

const EditUserRole = () => {
    const { userId } = useParams();
    const [role, setRole] = useState("user");
    const isAdmin = role === "user" ? false : true;
    const [updatedRoleSuccess, setUpdatedRoleSuccess] = useState(null)
    const [updatedRoleError, setUpdatedRoleError] = useState(null);
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    const handleUpdateUserRole = async (e) => { 
        e.preventDefault();
        try {
            setLoading(true)
            const { data } = await axios.patch(`${BaseURL}/user/update-user-role/${userId}`, { isAdmin }); 
            setUpdatedRoleSuccess(data?.message)
            setUpdatedRoleError(null);
            setLoading(false)
            setTimeout(() => {
                navigate("/dashboard?tab=users")
            }, 500);
        } catch (error) {
            setUpdatedRoleError(error?.response?.data?.message)
            console.log(error);
            setLoading(false)
        }
    };
    return <>
        <div className="h-screen flex justify-center items-center">
            <form onSubmit={handleUpdateUserRole} className="relative w-[500px] border p-5">
                <h2 className="text-red-50 text-center text-lg">Update User Role</h2>
                <div className="h-[40px] my-3">
                    <select onChange={(e) => setRole(e.target.value)} value={role} className=" h-full px-2 w-full bg-transparent outline-none border">
                        <option value="User" className="text-slate-800">User</option>
                        <option value="admin" className="text-slate-800">Admin</option>
                    </select>
                </div>
                <button disabled={loading} type="submit" className="text-lg font-bold bg-gradient-to-bl to-pink-500 from-yellow-400 bg-slate-800 w-full py-2 text-white rounded-lg">
                    {loading ? "Loading...":"Update user Role"}
                </button>
                <p className={`${updatedRoleSuccess ? "bg-green-300 text-slate-700" : "bg-red-500 text-slate-100"} 
                mt-2 rounded-md text-center self-center leading-10`}>
                    {updatedRoleSuccess ? updatedRoleSuccess : updatedRoleError}
                </p>
            </form>
        </div>

    </>
}
export default EditUserRole