import { useEffect, useState } from "react"
import axios from "axios";
import { BaseURL } from "../constants/index"
import { Link, useNavigate, useParams } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import { useSelector } from "react-redux";
import PostComment from "../components/PostComment";
import PostCard from "../components/PostCard";
import useFetchApi from "../Hooks/useFetchApi";
import LazyImage from "../components/LazyImage";
import Loader from "../components/Loader";
const PostPage = () => {
    const { data } = useSelector(state => state?.auth);
    const { data: { posts }, loading } = useFetchApi("post/posts?limit=3");
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [postPageLoading, setPostPageLoading] = useState(true);
    const [error, setError] = useState(null);
    const [content, setContent] = useState("");
    const [comments, setComments] = useState([]);
    const [numIncriment, setNumIncriment] = useState(3);
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    // handle get posts 
    useEffect(() => {
        ; (async () => {
            try {
                const { data: { data } } = await axios.get(`${BaseURL}/post/posts?slug=${slug}`)
                setPost(data?.posts[0]) 
                setPostPageLoading(false)
            } catch (error) {
                console.log(error);
                setError(error?.respose?.message)
            } finally {
                setPostPageLoading(false)
            }
        })();
    }, [slug])
    // handle get comments 
    useEffect(() => {
        const cancelToken = axios.CancelToken.source()
            ; (async () => {
                try {
                    const { data } = await axios.get(`${BaseURL}/comment/get-comments/${post?._id}`);
                    setComments(data?.data)
                } catch (error) {
                    console.log(error);
                }
            })()
        return () => {
            cancelToken.cancel()
        }
    }, [post?._id, content])
    // handle change 
    const handlerChange = (e) => {
        setContent(e.target.value)
    }
    // // handleSubmitComment
    const handleSubmitComment = async (e) => {
        e.preventDefault();
        try { 
            await axios.post(`${BaseURL}/comment/create-comment`, { content, postId: post?._id, userId: data?.user?._id })
            setContent("")
        } catch (error) {
            console.log(error);
        }
    }
    // handle like  
    const handleLike = async (id) => {
        try { 
            const { data: { data } } = await axios.post(`${BaseURL}/comment/likes/${id}`, {});
            setComments(
                comments?.map((comment) => { 
                    return comment?._id === id ? {
                        ...comment,
                        likes: data?.likes,
                        numberOfLikes: data?.likes?.length
                    } : comment
                })
            )
        } catch (error) {
            console.log(error);
        }
    }
    // handleDeleteComment
    const handleDeleteComment = async (id) => {
        try {
            if (!data?.user) {
                navigate("/sign-in")
            } 
            await axios.delete(`${BaseURL}/comment/delete-comment/${id}`);
            setComments(comments?.filter(comment => {
                return comment?._id !== id
            }));
        } catch (error) {
            console.log(error);
        }
    }
    const handleEdit = (comment, updatedContent) => {
        setComments(
            comments?.map(c => {
                return c?._id === comment?._id ? { ...c, content: updatedContent } : c
            })
        )
    }
    if (error) {
        return error
    }
    if (postPageLoading) {
        return  <div className="w-full h-screen flex justify-center items-center">
            <Loader/>
        </div>
    }
    return (
        <>
            <section className="md:px-16">
                <div className=" text-center my-5  flex flex-col gap-4 items-center">
                    <h2 className="text-3xl capitalize">{post?.title}</h2>
                    <button className="text-[12px] px-2 py-1 bg-slate-300 dark:bg-slate-700 rounded-lg">{post?.category}</button>
                    <div className="max-w-[900px] h-[200px] md:h-[400px] border rounded-lg overflow-hidden">
                            <LazyImage  src={post?.image} alt="post-image"/> 
                    </div>
                </div>
                <div className="">
                    <div
                        className='p-3 max-w-2xl mx-auto w-full post-content'
                        dangerouslySetInnerHTML={{ __html: post && post.content }}
                    ></div>
                </div>
                <div className="max-w-[1000px] m-auto">
                    <CallToAction />
                    </div>
                <div className="wrapper max-w-[600px] m-auto">
                    {data?.user?.userName ? (
                        <>
                            <div className="my-4">
                                <div className="flex items-center gap-2">
                                    <p>Signed in as: </p>
                                    <div className="flex items-center gap-2">
                                        <div className="h-5 w-5 rounded-full overflow-hidden">
                                            <LazyImage src={data?.user?.avatar || "../images/avatar.png"} alt="user-Avatar" />
                                        </div>
                                        <Link className="text-sm text-teal-500" to="/dashboard?tab=profile">@{data?.user?.userName}</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="border-2 rounded-md">
                                <form onSubmit={handleSubmitComment} className="p-4 flex flex-col gap-6" >
                                    <div className="h-[100px] border rounded-md overflow-hidden">
                                        <textarea onChange={handlerChange} value={content} maxLength="200" className="dark:bg-slate-700 bg-slate-100 p-2 resize-none w-full rounded-md h-full" placeholder="Add a comment"></textarea>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-[12px] text-slate-400 font-semibold">{`${200 - content.length} Characters remaining`}</p>
                                        <button className="border-2 border-teal-600 py-1 px-2 rounded-lg text-sm cursor-pointer" type="submit">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </>
                    ) : (
                        <div className="flex gap-2 mt-2">
                            <p className="text-sm font-semibold">You must be signed to comment,</p>
                            <Link className="text-sm text-teal-300 hover:underline" to="/sign-in">Sign In</Link>
                        </div>
                    )}
                    <div className="my-4">
                        {
                            comments?.length === 0 ? (<h3 className="text-gray-400">No Comments Yet</h3>) : (
                                <>
                                    <div className="flex items-center gap-2" >
                                        <h2 className="text-[16px]">Comments</h2>
                                        <p className="border w-[20px] h-[20px] text-[12px] text-center leading-[20px]">{comments?.length}</p>
                                    </div>
                                    <div className="my-4 flex flex-col gap-2 md:px-6">
                                        {comments?.slice(0, numIncriment)?.map((comment) => {
                                            return <PostComment comment={comment} key={comment._id} handleLike={handleLike} onEdit={handleEdit} handleDeleteComment={handleDeleteComment} />
                                        })}
                                        {comments?.length > 3 ?
                                            (
                                                numIncriment < 4 ?
                                                    <button onClick={() => setNumIncriment(prev => prev + comments?.length)} className="text-teal-400 text-sm">
                                                        Show More Comments
                                                    </button> :
                                                    <button onClick={() => setNumIncriment(3)} className="text-teal-400 text-sm">
                                                        Less Comments
                                                    </button>
                                            ) : ""}
                                    </div>
                                </>
                            )
                        }
                    </div>
                </div>
                <div className="my-4">
                    <h2 className="text-center text-xl font-medium">Recent Articals</h2>
                    <div className="flex mt-6 flex-wrap gap-4 justify-center items-center">
                        {
                            loading ? ("Loading...") : (
                                posts?.map(post => {
                                    return <PostCard posts={post} key={post?._id} />
                                })
                            )
                        }
                    </div>
                </div>
            </section>
        </>
    )
}
export default PostPage