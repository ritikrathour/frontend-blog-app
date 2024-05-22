import { useEffect, useState } from "react";
import axios from "axios"
import { BaseURL } from "../constants";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LazyImage from "./LazyImage";
const DashBoard = () => {
    const { user } = useSelector(state => state.auth.data);
    const [totalUsers, setTotalUsers] = useState(null)
    const [lastMonthuser, setLastMonthuser] = useState(null);
    const [totalPosts, setTotalPosts] = useState(null)
    const [lastMonthpost, setLastMonthPosts] = useState(null);
    const [totalComments, setTotalComments] = useState(null)
    const [lastMonthComments, setLastMonthComments] = useState(null);
    const [users, setUsers] = useState([]);
    const [comments, setComments] = useState([]);
    const [posts, setPosts] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    axios.defaults.withCredentials = true;
    // get multiple api's data
    const fetchData = async (url) => { 
        const { data } = await axios.get(`${BaseURL}/${url}`);
        return data
    }
    
    useEffect(() => {
        const urls = ["user/users?limit=6", "post/posts?limit=6", "comment/comments?limit=8"]
        const multipaleSourse = async () => {
            try {
                const response = await Promise.all(urls?.map(url => fetchData(url)));
                const result = response?.map(res => res);
                setUsers(result[0]?.data?.users)
                setTotalUsers(result[0]?.data?.totalUsers);
                setLastMonthuser(result[0]?.data?.lastMonthUsers);
                setPosts(result[1]?.data?.posts);
                setTotalPosts(result[1]?.data?.totalPosts);
                setLastMonthPosts(result[1]?.data?.totalPosts);
                setComments(result[2]?.data?.comments)
                setTotalComments(result[2]?.data?.totalComments)
                setLastMonthComments(result[2]?.data?.lastMonthComments)
                setError(null)
            } catch (error) {
                console.log(error?.response?.data?.message || error?.message);
                setError(error?.response?.data?.message || error?.message)
                setLoading(false)
            } finally {
                setLoading(false)
            }
        }
        if (user?.isAdmin) {
            multipaleSourse()
        }
    }, [user?.isAdmin])

    if (error) {
        return error
    }
    return (
        <>
            <div className="">
                <ul className="flex justify-center gap-4 items-center flex-wrap">
                    <li className="dark:shadow-slate-800 flex gap-4 p-4 dark:shadow shadow-2xl w-full sm:w-[300px] justify-between rounded-md">
                        <div>
                            <h3 className="text-xl uppercase font-semibold my-1">total user</h3>
                            {
                                loading ? "Loading..." : <p className="text-2xl font-bold mb-3">{totalUsers}</p>
                            }
                            <p className="text-sm"><span className="text-green-500 text-[12px]"><i className="fas fa-arrow-up mr-1" />
                              {lastMonthuser} </span> Last month</p>
                        </div>
                        <p className="w-[35px] h-[35px] rounded-full bg-green-700 text-center leading-[35px]"><i className="fas fa-users text-white"></i></p>
                    </li>
                    <li className="dark:shadow-slate-800 flex gap-4 p-4 dark:shadow shadow-2xl w-full sm:w-[300px] justify-between rounded-md">
                        <div>
                            <h3 className="text-xl uppercase font-semibold my-1">total comments</h3> {
                                loading ? "Loading..." : <p className="text-2xl font-bold mb-3">{totalComments}</p>
                            } 
                            <p className="text-sm"><span className="text-green-500 text-[12px]"><i className="fas fa-arrow-up  " /> {lastMonthComments}</span> Last month</p>
                        </div>
                        <p className="w-[35px] h-[35px] rounded-full bg-purple-800 text-center leading-[35px]"><i className="fas fa-comments text-white"></i></p>
                    </li>
                    <li className="dark:shadow-slate-800 flex gap-4 p-4 dark:shadow shadow-2xl w-full sm:w-[300px] justify-between rounded-md">
                        <div>
                            <h3 className="text-xl uppercase font-semibold my-1">total posts</h3>
                            {
                                loading ? "Loading..." : <p className="text-2xl font-bold mb-3">{totalPosts}</p>
                            }  
                            <p className="text-sm"><span className="text-green-500 text-[12px]"><i className="fas fa-arrow-up  " /> {lastMonthpost}</span> Last month</p>
                        </div>
                        <p className="w-[35px] h-[35px] rounded-full bg-lime-600 text-center leading-[35px]"><i className="fas fa-bars text-white"></i></p>
                    </li>
                </ul>
                <div className="flex flex-wrap justify-center my-8 gap-4">
                    <div className="w-full sm:w-[270px] dark:bg-slate-700 dark:shadow-md dark:shadow-slate-800 shadow-xl p-2">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-bold text-[12px]">Recent users</h3>
                            <button className="py-[2px] px-2 border rounded-md text-[12px]">
                                <Link to="/dashboard?tab=users">
                                    See all
                                </Link>
                            </button>
                        </div>
                        <div className="">
                            <div className="flex justify-between">
                                <p>User Image</p>
                                <p>User Name</p>
                            </div>
                            {
                                users?.map((user) => {
                                    return ( 
                                        <div className="dark:hover:bg-slate-600 hover:bg-slate-100 py-1 rounded-[4px] transition-all flex justify-between items-start my-1 px-5" key={user?._id}>
                                            <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                                                <LazyImage src={user?.avatar} alt="user-avatar" />
                                            </div>
                                            <p className="text-left text-sm capitalize">{user?.userName}</p>
                                        </div> 
                                    ) 
                                })
                            }
                        </div>
                    </div>
                    <div className="w-full sm:w-[270px] dark:bg-slate-700 dark:shadow-md dark:shadow-slate-800 shadow-xl p-2">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-bold text-[12px]">Recent comments</h3>
                            <button className="py-[2px] px-2 border rounded-md text-[12px]"><Link to="/dashboard?tab=comments">
                                See all
                            </Link></button>
                        </div>
                        <div className="">
                            <div className="flex justify-between">
                                <p>Comment Content</p>
                                <p>Likes</p>
                            </div>
                            {
                                comments?.length === 0 ? (<p className="text-center my-2">No Comments Yet!</p>) : (
                                    comments?.map(comment => {
                                        return (<div key={comment?._id} className="dark:hover:bg-slate-600 hover:bg-slate-100  py-1 rounded-[4px] transition-all flex justify-between my-1 px-5">
                                            <p className="text-gray text-sm capitalize">{comment?.content}</p>
                                            <p>{comment?.numberOfLikes}</p>
                                        </div>)
                                    })
                                )
                            }
                        </div>
                    </div>
                    <div className="w-full sm:w-[270px] dark:bg-slate-700 dark:shadow-md dark:shadow-slate-800 shadow-xl p-2">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-bold text-[12px]">Recent posts</h3>
                            <button className="py-[2px] px-2 border rounded-md text-[12px]">
                                <Link to="/dashboard?tab=posts">See all</Link>
                            </button>
                        </div>
                        <div className="">
                            <div className="flex justify-between">
                                <p>Post Image</p>
                                <p>Post Title</p>
                            </div>
                            {
                                posts?.map(post => {
                                    return (
                                        <div key={post?._id} className="dark:hover:bg-slate-600 hover:bg-slate-100 py-1 rounded-[4px] transition-all flex justify-between my-1 px-2">
                                            <div className="w-[70px] h-[40px] rounded-[4px] overflow-hidden">
                                            <LazyImage src={post?.image} alt="post-image" />
                                            </div>
                                            <p>{post?.title}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default DashBoard;