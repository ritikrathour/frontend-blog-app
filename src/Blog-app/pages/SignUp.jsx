import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CTA from "../components/CTA"
import { BaseURL } from "../constants"
import uploadFile from "../helper/UploadPhoto";
import LazyImage from "../components/LazyImage";
axios.defaults.withCredentials = true;
const SignUp = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [showpass, setShowPass] = useState(false);
    const [avatarUploadLoading, setAvatarUploadLoading] = useState(false)
    const [user, setUser] = useState({
        userName: "", email: "", password: "", avatar: ""
    })

    const { userName, email, password, avatar } = user;
    const changeHandler = (e) => {
        const { name, value } = e.target
        setUser((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    };
    // handleUploadPhoto
    const handleUploadPhoto = async (e) => {
        setAvatarUploadLoading(true)
        try {
            const file = e.target.files[0]

            const uploadPhoto = await uploadFile(file);
            setUser((preve) => {
                return {
                    ...preve,
                    avatar: uploadPhoto?.url
                }
            })
            setAvatarUploadLoading(false)
        } catch (error) {
            setAvatarUploadLoading(false)
            console.log(error);
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation()
        try {
            setLoading(true);
            setError(null);
            const { data } = await axios.post(`${BaseURL}/user/signup`, user);
            setMessage(data?.message);
            setLoading(false);
            setError(null);
            setTimeout(() => {
                navigate("/sign-in")
            }, 500);
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError(error?.response?.data?.message);
        }
    }
    // handleShow password  
    const handleShowPassword = () => {
        setShowPass(!showpass)
    }
    return (
        <>
            <section className=" flex flex-col justify-center min-h-screen gap-4 w-full md:flex-row md:items-center ">
                <div className="flex flex-col items-start">
                    <CTA text="sign up" />
                </div>
                <form action="" onSubmit={(e) => handleSubmit(e)} method="POST"
                    className="lg:px-10 md:min-w-[500px]">
                    <div className="flex gap-4 flex-col">
                        <div className="flex flex-col gap-2">
                            <label className="text-[16px]" htmlFor="userName">Username</label>
                            <input placeholder="Username" className="px-2 text-slate-700 border-2 border-gray-300 rounded-md
                             focus:bg-slate-100 h-[40px] dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600" type="text"
                                id="userName" name="userName" value={userName} required autoComplete="off" onChange={(e) => changeHandler(e)} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[16px] " htmlFor="email">Email</label>
                            <input placeholder="name@company.com" className="px-2 text-slate-700 border-2 border-gray-300 rounded-md
                             focus:bg-slate-100 h-[40px] dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600" type="email"
                                id="email" name="email" value={email} required autoComplete="off" onChange={changeHandler} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[16px] " >Avatar</label>
                            <div className="w-full flex justify-between items-center gap-2">
                                <input className="px-2 text-slate-700 border-2 border-gray-300 rounded-md
                             py-2 dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600 h-full w-[220px] md:w-[400px]"
                                    type="file" id="avtar" name="avatar" onChange={handleUploadPhoto} />
                                <div className="w-[50px] h-[50px] rounded-full my-2 overflow-hidden">
                                    <label htmlFor="avtar" className="h-full w-full object-cover cursor-pointer">
                                        <LazyImage src={avatar || "../images/avatar.png"} alt="Avatar" />
                                    </label>
                                </div>
                            </div>
                            {avatarUploadLoading && <div className="flex items-center justify-center gap-1">Uploading..<div className="lds-hourglass"></div></div>}
                        </div>
                        <div className="flex flex-col gap-2 relative">
                            <label className="text-[16px]" htmlFor="password">Password</label>
                            <input placeholder="Password" className="px-2 text-slate-700 border-2 border-gray-300 rounded-md
                             focus:bg-slate-100 h-[40px] dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600" type={showpass ? "text" : "password"} id="password" name="password" value={password} required autoComplete="off" onChange={(e) => changeHandler(e)} />
                            <div className=" absolute bottom-2 cursor-pointer right-3" onClick={handleShowPassword}>
                                <i className={`fas ${showpass ? "fa-eye" : "fa-eye"}`}></i>
                            </div>
                        </div>
                    </div>
                    <button disabled={loading} type="submit" className="mt-4 bg-gradient-to-bl to-pink-500 from-yellow-400 w-full py-2 text-white rounded-lg">
                        {loading ? "Loading..." : "Sign Up"}
                    </button>
                    <p className="text-center my-2 text-[16px]"  >
                        already have an account?
                        <Link className="text-[16px] text-blue-500" to="/sign-in"> Sign In</Link>
                    </p>
                    <p className={`${message ? "bg-green-300 text-black" : "bg-red-500 text-white"}
                     rounded-md text-center self-center leading-10`}>
                        {message && message}
                        {error && error}
                    </p>
                </form>
            </section>
        </>
    )
}
export default SignUp