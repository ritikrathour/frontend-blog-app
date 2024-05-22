 
import { Link } from "react-router-dom"; 
import PostCard from "../components/PostCard";
import useFetchApi from "../Hooks/useFetchApi";
import CallToAction from "../components/CallToAction";
import Loader from "../components/Loader";
const Home = () => { 
    const { data, loading, error } = useFetchApi("post/posts"); 
    return (
        <>
            <section className="banner mb-4">
                <div className="py-14 px-6 bg-slate-200 dark:bg-slate-950">
                    <h1 className="text-[35px] font-bold md:text-[45px]">Welcome to my Blog</h1>
                    <p className="text-[14px] text-slate-500 mb-2">Here you'll find a variety of artical and tutourials on topics such as web development, software enginering, and programming languages.</p>
                    <Link to={"/blog-posts"} className="text-green-500 font-semibold text-sm">View all posts</Link>
                </div>
                <CallToAction />
                <div className="mt-4 flex flex-col gap-2 ">
                    <h2 className="text-center text-xl font-medium">Recent Articals</h2>
                    {
                        error === "Network Error" ? ("You are offline or may be network error!"):(<p className="text-red-500 underline">{error}</p>)
                    }
                    <div className="flex my-6 flex-wrap gap-4 justify-center items-center">
                        {
                            data?.posts?.length !== 0 ?(
                                loading ? (<Loader/>) : (
                                    data?.posts?.map(post => {
                                        return <PostCard posts={post} key={post?._id} />
                                    })
                                )
                            ):("No Posts Yets!")
                        }
                    </div>
                    {
                        data?.posts?.length >= 9 ? (<button className="text-blue-400 hover:underline transition-all">
                            <Link to="/blog-posts">More Blogs</Link>
                        </button>) : (null)
                    }
                </div>
            </section>
        </>
    )
}
export default Home;
