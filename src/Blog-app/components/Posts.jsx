import axios from "axios";
import { useEffect, useState } from "react";
import { BaseURL } from "../constants";
import { useSelector } from "react-redux";
import TableBody from "./TablePostBody";
import Loader from "./Loader";

const Posts = () => {
    const theadData = [
        { id: 1, value: "Data updated" },
        { id: 2, value: "post image" },
        { id: 3, value: "post title" },
        { id: 4, value: "Category" },
        { id: 5, value: "delete" },
        { id: 6, value: "edit" },
    ]
    const [showMore, setShowMore] = useState(false);
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const { user } = useSelector(state => state.auth.data);
    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        // handle get posts 
        const getPosts = async () => {
            try {
                setLoading(true)
                const { data } = await axios.get(`${BaseURL}/post/posts?${user?._id}`, {
                    cancelToken: cancelToken.token
                })
                setPost(data?.data?.posts)
                setLoading(false)
                if (data?.data?.posts?.length >= 9) {
                    setShowMore(true)
                }
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log("cncelled");
                } else {
                    setError(error?.response?.data?.message);
                    console.log(error);
                }
            }
        }
        if (user?.isAdmin) {
            getPosts()
        }
        return () => {
            cancelToken.cancel()
        }
    }, [user?.isAdmin]);

    // handleShowMore
    const handleShowMore = async () => {
        setShowMore(false)
        const startIndex = post.length;
        try {
            const { data } = await axios.get(`${BaseURL}/post/posts?${user?._id}&startIndex=${startIndex}`)
            setPost(prev => [...prev, ...data?.data?.posts])
        } catch (error) {
            console.log(error?.response?.data?.message);
        }
    }
    if (loading) {
        return <Loader/>
    }
    if (error) {
        return <h1>{error}</h1>
    } 
    return (
        <>
            <section className="w-full overflow-x-auto md:-mt-9">
                { post?.length !== 0 ?
                <table className="w-full dark:bg-slate-800 bg-slate-200 rounded-lg overflow-hidden">
                    <thead className="dark:bg-slate-700 bg-slate-300">
                        <tr >
                            {
                                theadData?.map(item => {
                                    return <th key={item?.id} className="p-2 text-[16px] uppercase dark:text-slate-300 text-left tracking-wide">{item?.value}</th>
                                })
                            }
                        </tr>
                    </thead>
                        <tbody>
                        { 
                                post && post?.map(item => {
                                    return <TableBody data={item} setPost={setPost} key={item?._id} user={user} />
                                }) 
                        }
                    </tbody> 
                </table>  :
                <h2>You have no posts yet</h2>  
            }
                {
                    showMore && (
                        <button onClick={handleShowMore} className="w-full text-teal-500 py-2">Show More</button>
                    )
                }
            </section>
        </>
    )
}
export default Posts;