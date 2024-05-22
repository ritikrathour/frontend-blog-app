import axios from "axios"
import { useState } from "react"
import { BaseURL } from "../constants"
import { useDispatch, useSelector } from "react-redux"
import { signOutFailare, signOutStart, signOutSuccess, updateFailare, updateStart, updateSuccess } from "../store/AuthSlice"
import { Link, useNavigate } from "react-router-dom"
import PopUp from "./PopUp"
import uploadFile from "../helper/UploadPhoto";
import LazyImage from "./LazyImage"
const Profile = () => {
    axios.defaults.withCredentials = true;
    const { loading, data, signout } = useSelector(state => state.auth);

    const id = data?.user?._id;
    const navigate = useNavigate()
    const [user, setUser] = useState({ 
    });
    const [avataUrl, setAvatarUrl] = useState('');
    const [avatarLoading,setAvatarLoading] = useState(false)
    const dispatch = useDispatch();
    const [updateUserSuccess, setUpdateUserSuccess] = useState("");
    const [updateUserError, setUpdateUserError] = useState("");
    const [SignOutError, setSignOutError] = useState("");
    const [showPopUp, setShowPopUp] = useState(false);
    // showPopUp handler 
    const ShowPopUpHandler = () => {
        setShowPopUp(prev => !prev)
    }
    // change handler 
    const changeHandler = (e) => {
        setUser({ ...user, [e.target.id]: e.target.value })
    } 
    // handle photo update  
    const handleUploadPhoto = async (e) => {
        try {
            setAvatarLoading(true)
            const file = e.target.files[0]
            const uploadPhoto = await uploadFile(file); 
            setAvatarUrl(uploadPhoto?.url);
                setUser((preve) => {
                    return {
                        ...preve,
                        avatar: uploadPhoto?.url
                    }
                })  
                setAvatarLoading(false)
        } catch (error) {
            setAvatarLoading(false)
            console.log(error);
        }
    }
    // update handler 
    const updateHandler = async (e) => {
        e.preventDefault()
        // if(Object.keys(user).)
        try {
            dispatch(updateStart(true))
            const { data } = await axios.patch(`${BaseURL}/user/update-user/${id}`, user, { withCredentials: true });
            dispatch(updateSuccess(data?.data));
            setUpdateUserSuccess("User's profile update successfully");
            setTimeout(() => {
                setUpdateUserSuccess("")
            }, 2000);
        } catch (error) {
            dispatch(updateFailare(error?.response?.data?.message));
            setUpdateUserError(error?.response?.data?.message)
            console.log(error);
        }
    }
    // deleteUser 
    const handleDeleteUser = async (id) => {
        try {
            setShowPopUp(false)
            await axios.delete(`${BaseURL}/user/delete-user/${id}`, { withCredentials: true })
            localStorage.removeItem("userData");
            navigate("/")
        } catch (error) {
            console.log(error);
            console.log(error?.message);
        }
    }
    const handleSignOut = async () => {
        try {
            dispatch(signOutStart(true))
            const { data } = await axios.patch(`${BaseURL}/user/sign-out`, { withCredentials: true });
            setTimeout(() => {
                dispatch(signOutSuccess(data?.message));
                setSignOutError("")
            }, 500);
            setTimeout(() => {
                dispatch(signOutSuccess(""));
            }, 500);
        } catch (error) {
            dispatch(signOutFailare(error?.response?.data?.message))
            setSignOutError(error?.response?.data?.message)
            console.log(error);
        }
    }
    return (
        <>
            <h2 className="text-xl font-semibold">Profile</h2>
            <div className="w-[80px] h-[80px] rounded-full my-2 overflow-hidden">
                <input className="hidden px-2"
                    type="file" id="avtar" name="avatar" onChange={handleUploadPhoto} />
                <label htmlFor="avtar" className="h-full w-full object-cover cursor-pointer">
                    <LazyImage src={avataUrl || data?.user?.avatar || "../images/avatar.png"} alt="User-Avatar" />
                </label>
            </div>
                {
                    avatarLoading && <p className="text-white text-sm">Avatar Uploading...</p>
                }
            <form onSubmit={(e) => updateHandler(e)} method="POST"
                className="lg:px-10 w-full md:w-[500px]">
                <div className="flex gap-4 flex-col">
                    <div className="flex flex-col gap-2">
                        <label className="text-[16px]" htmlFor="userName">Username</label>
                        <input placeholder="Username" className="px-2 text-slate-700 border-2 border-gray-300 rounded-md
                             focus:bg-slate-100 h-[40px]" type="text" id="userName" defaultValue={data?.user?.userName} name="userName" autoComplete="off" onChange={(e) => changeHandler(e)} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[16px] " htmlFor="email">Email</label>
                        <input placeholder="name@company.com" className="px-2 text-slate-700 border-2 border-gray-300 rounded-md
                             focus:bg-slate-100 h-[40px]" type="email" id="email" defaultValue={data?.user?.email} name="email" autoComplete="off" onChange={(e) => changeHandler(e)} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[16px]" htmlFor="password">Password</label>
                        <input placeholder="Password" className="px-2 text-slate-700 border-2 border-gray-300 rounded-md
                             focus:bg-slate-100 h-[40px]" type="password" id="password" name="password" autoComplete="off" onChange={(e) => changeHandler(e)} />
                    </div>
                </div>
                <button disabled={loading} type="submit" className="mt-4 bg-gradient-to-bl to-pink-500 from-yellow-400 w-full py-2 text-white rounded-lg">
                    {loading ? "Loading..." : "Update"}
                </button>
                {
                    data?.user?.isAdmin &&
                    <Link to={"/create-post"}>
                        <button type="button" className="mt-4 bg-gradient-to-bl to-lime-900 from-yellow-500 w-full py-2 text-white rounded-lg">
                             Create Post
                        </button>
                    </Link>
                }
                <div className="flex justify-between items-center mt-2">
                    <h4 className="cursor-pointer text-red-700 font-semibold" onClick={ShowPopUpHandler}>Delete Account</h4>
                    <h4 className="cursor-pointer text-red-700 font-semibold" onClick={handleSignOut}>Sign Out</h4>
                </div>
                <p className={`${updateUserSuccess ? "bg-green-300 text-slate-800" : "bg-red-500 text-white"} rounded-md text-center self-center leading-10`}>
                    {updateUserSuccess ? updateUserSuccess : updateUserError}
                </p>
                <p className={`${!SignOutError ? "bg-green-300 text-slate-800" : "bg-red-500 text-white"} rounded-md text-center self-center leading-10`}>
                    {signout ? signout : SignOutError}
                </p>

            </form>
            {/* popUp box  */}
            <PopUp handleDeleteUser={handleDeleteUser} ShowPopUpHandler={ShowPopUpHandler} id={id} showPopUp={showPopUp} text={"Delete Own Profile. Are you sure?"} />
        </>
    )
}
export default Profile;