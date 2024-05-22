import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CTA from "../components/CTA";
import axios from "axios";
import { BaseURL } from "../constants"
import { signInFailare, signInStart, signInSuccess } from "../store/AuthSlice";
axios.defaults.withCredentials = true;
const SignIn = () => { 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [signInSuccessMsg, setSigninSuccessMsg] = useState("")
    const [signInError, setSigninError] = useState("")
    const [showpass, setShowPass] = useState(false)
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const { loading } = useSelector(state => state.auth);
    // handle change 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }))
    }
    // handle signIn 
    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            dispatch(signInStart(true));
            const { data } = await axios.post(`${BaseURL}/user/sign-in`, user, { withCredentials: true });
            dispatch(signInSuccess(data?.data));
            setSigninSuccessMsg("User SingIn successfully!")
            setUser({ email: "", password: "" })
            setTimeout(() => {
                navigate("/");
            }, 1000);
        } catch (error) {
            dispatch(signInFailare(error?.response?.data?.message))
            setSigninError(error?.response?.data?.message)
            console.error(error);
        }
    }
    // handleShow password  
    const handleShowPassword = () => {
        setShowPass(!showpass)
    }

    return (
        <>
            <section className="flex flex-col justify-center min-h-screen gap-4 w-full md:flex-row md:items-center">
                <div className="flex flex-col items-start">
                    <CTA text="Sign in" />
                </div>
                <form action="" onSubmit={(e) => handleSignIn(e)} method="POST"
                    className="md:w-[500px] lg:px-10">
                    <div className="flex gap-4 flex-col">
                        <div className="flex flex-col gap-4">
                            <label className="" htmlFor="email">Email</label>
                            <input className="px-2 text-slate-700 border-2 border-gray-300 rounded-md
                             focus:bg-slate-100 dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600  h-[40px]" placeholder="name@company.com" type="email" id="email" name="email" value={user.email} required autoComplete="off" onChange={(e) => handleChange(e)} />
                        </div>
                        <div className="flex flex-col gap-4 relative">
                            <label className="" htmlFor="Password">Password</label>
                            <input className="px-2 text-slate-700 border-2 border-gray-300 rounded-md
                             focus:bg-slate-100 dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600  h-[40px]" placeholder="password" type={showpass ? "text" : "password"} id="password" name="password" value={user.password} required autoComplete="off" onChange={(e) => handleChange(e)} />
                            <div className=" absolute bottom-2 cursor-pointer right-3" onClick={handleShowPassword}>
                                <i className={`fas ${showpass ? "fa-eye" : "fa-eye-slash"}`}></i>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className=" bg-gradient-to-bl to-pink-500 from-yellow-400 mt-4 bg-slate-800 w-full py-2 text-white rounded-lg" disabled={loading}>
                        {loading ? "Loading" : "Sign In"}
                    </button>
                    <p className="text-center my-2 text-[14px]">
                        Don't have an account?
                        <Link className="text-[14px] text-blue-500" to="/sign-up"> Sign up</Link>
                    </p>
                    <p className={`${signInSuccessMsg ? "bg-green-300 text-slate-700" : "bg-red-500 text-slate-100"} rounded-md text-center self-center leading-10`}>
                        {signInSuccessMsg ? signInSuccessMsg : signInError}
                    </p>


                </form>
            </section>
        </>
    )
}
export default SignIn;