import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseURL } from "../constants";
import PostCard from "../components/PostCard"
axios.defaults.withCredentials = true;
const SearchPage = () => {
    const [sidebarData, setSideBarData] = useState({
        searchTerm: "",
        sort: "desc",
        category: ""
    });
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()
    const location = useLocation()
    const handleChange = (e) => {
        if (e.target.id === "searchTerm") {
            setSideBarData({ ...sidebarData, searchTerm: e.target.value })
        }
        if (e.target.id === "sort") {
            const order = e.target.value || "desc";
            setSideBarData({ ...sidebarData, sort: order })
        }
        if (e.target.id === "category") {
            const category = e.target.value || "uncategorized"
            setSideBarData({ ...sidebarData, category: category })
        }
    };
    const handleSubmit = (e) => { 
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', sidebarData.searchTerm);
        urlParams.set('sort', sidebarData?.sort || "desc");
        urlParams.set('category', sidebarData.category || "");
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromURL = urlParams.get("searchTerm");
        const sortFromURL = urlParams.get("sort");
        const categoryFromURL = urlParams.get("category");
        if (searchTermFromURL || sortFromURL || categoryFromURL) {
            setSideBarData({
                ...sidebarData,
                searchTerm: searchTermFromURL,
                sort: sortFromURL,
                category: categoryFromURL
            });
        };
        const fetchPosts = async () => {
            try {
                const searchQuery = urlParams.toString();
                const { data } = await axios.get(`${BaseURL}/post/posts?${searchQuery}`)
                setPosts(data?.data)

            } catch (error) {
                setLoading(false)
                console.log(error);
            } finally {
                setLoading(false)
            }
        }
        fetchPosts()
    }, [location.search]);
    return (
        <>

            <div className=' flex flex-col md:flex-row gap-4'>
                <div className='p-7 border-b md:border-r border-gray-500 md:h-[85vh] sticky'>
                    <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
                        <div className='flex items-center gap-2'>
                            <label className='whitespace-nowrap font-semibold'>
                                Search Term:
                            </label>
                            <input
                                className="text-black border rounded-sm"
                                placeholder='Search...'
                                id='searchTerm'
                                type='text'
                                value={sidebarData.searchTerm}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='flex items-center gap-2'>
                            <label className='font-semibold'>Sort:</label>
                            <select onChange={handleChange} className="text-black border rounded-sm"
                                value={sidebarData.sort || "desc"} id='sort'>
                                <option value='desc'>Latest</option>
                                <option value='asc'>Oldest</option>
                            </select>
                        </div>
                        <div className='flex items-center gap-2'>
                            <label className='font-semibold'>Category:</label>
                            <select
                                className="text-black border rounded-sm"
                                onChange={handleChange}
                                defaultValue={sidebarData.category}
                                id='category'
                            >
                                <option value='uncategorized'>Uncategorized</option>
                                <option value="JavaScript">JavaScript</option>
                                <option value="React">React</option>
                                <option value="HTML-CSS">HTML-CSS</option>
                                <option value="Phyton">Phyton</option>
                                <option value="Express">Express</option>
                                <option value="Node.js">Node.js</option>
                                <option value="MongoDb">MongoDb</option>
                            </select>
                        </div>
                        <button type='submit' className="border w-[200px] m-auto py-1 rounded-md dark:hover:bg-slate-700 hover:bg-slate-100 transition-all">
                            Apply Filters
                        </button>
                    </form>
                </div>
                <div className='w-full'>
                    <h1 className='text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5 '>
                        Posts results:
                    </h1>
                    <div className='p-7 flex flex-wrap gap-4'>
                        {!loading && posts?.posts?.length === 0 && (
                            <p className='text-xl text-gray-500'>No posts found.</p>
                        )}
                        {loading && <p className='text-xl text-gray-500'>Loading...</p>}
                        {!loading &&
                            posts?.posts?.map((post) => <PostCard key={post._id} posts={post} />)
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
export default SearchPage;