import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { toggleTheme } from "../store/themeSlice";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import { NavLinks } from "../constants";
import NavBarLink from "../components/NavBarLink"; 
const NavBar = () => {
    const { theme } = useSelector(state => state.theme);
    const { data } = useSelector(state => state.auth); 
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [query, setQuery] = useState("");
    const location = useLocation();
    const navigate = useNavigate()
    const handleShowLinks = () => {
        setShow((prev)=>!prev)
    }
    // handleChangeQuery 
    const handleChangeQuery = (event) => {
        setQuery(event.target.value)
    }
    // handleSearch 
    const handleSearch = (event) => {
        event.preventDefault();
        if (query !== "") {
            const urlParams = new URLSearchParams(location.search)
            urlParams.set("searchTerm", query);
            const searchQuery = urlParams.toString();
            navigate(`/search?${searchQuery}`);
        }
    }
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromURL = urlParams.get("searchTerm");
        if (searchTermFromURL) {
            setQuery(searchTermFromURL)
        }
    }, [location.search]); 
    return (

        <>
            <nav className="flex justify-between items-center py-2 transition-all"> 
                < Link to={"/"} className="font-bold text-[18px]">
                    <span className="inline-block bg-gradient-to-bl to-pink-500 from-yellow-400 rounded-[6px] px-1 text-white">M24's</span>Blog
                </Link>
                <form onSubmit={handleSearch} className=" hidden md:block border-solid border-2 dark:border-slate-600 relative h-8 md:w-72 overflow-hidden rounded-full cursor-pointer">
                    <input type="text"
                        value={query}
                        onChange={(event) => handleChangeQuery(event)}
                        placeholder="Search..."
                        className="text-sm text-slate-800 bg-gray-100 dark:bg-slate-700 
                    dark:text-slate-200 rounded-md px-2 w-full h-full pr-6"
                    />

                    <button type="submit" className="absolute top-[50%] right-2 translate-y-[-50%] dark:text-slate-400 text-slate-700">
                        <i className="fas fa-search"></i>
                    </button>
                </form>
                <ul className={`${show ? "opacity-1" : "opacity-0 invisible"}  w-48 dark:bg-slate-600 bg-slate-300 
                p-2  absolute right-4 top-14 rounded-lg `}>
                    {
                        NavLinks.map((item) => <NavBarLink key={item.id} data={item} func={handleShowLinks} />)
                    }
                </ul>
                <div className="flex gap-2 items-center">
                {
                        data?.user?.userName ? (
                            <div className=" w-8 h-8 rounded-full cursor-pointer overflow-hidden">
                                <Link to={`/dashboard?tab=profile`} className="capitalize">
                                    <img className="h-full object-cover" src={data?.user?.avatar || "../images/avatar.png"} alt="avatar" /> 
                                </Link>
                             </div> 
                        ) : (
                            <div className="w-[120px]">
                                <Button text="Sign Up" endpoint="sign-up" />
                            </div>
                        )
                    }
                    {
                        data?.user?.isAdmin &&
                        <Link className="w-8 h-8 rounded-full cursor-pointer border-2 border-gray-200 flex justify-center items-center" to={"/create-post"}>
                            <i className="fas fa-pen"></i>
                        </Link>
                    }

                    <div onClick={() => dispatch(toggleTheme())} className="w-8 h-8 rounded-full cursor-pointer border-2 border-gray-200 flex justify-center items-center">
                        {
                            theme === "dark" ? (<i className="fas fa-moon" />) : (<i className="fas fa-sun" />)
                        }
                    </div>
                    <div className="w-8 h-8 rounded-full cursor-pointer border-2 border-gray-200 flex justify-center items-center" onClick={handleShowLinks}>
                        <i className={`fas ${!show ? "fa-bars" : "fa-times"} text-lg`}></i>
                    </div>
                </div>
            </nav>
        </>
    )
}
export default NavBar
