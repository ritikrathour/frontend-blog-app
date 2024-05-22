import { useEffect, useState } from "react";
import TableCommentsBody from "./TableCommentsBody";
import axios from "axios";
import { BaseURL } from "../constants";
import { useSelector } from "react-redux"
import Loader from "./Loader";
export const DashComments = () => {
    const tHeadData = [
        { id: 1, value: "Data Updated" },
        { id: 2, value: "comment Content" },
        { id: 3, value: "no. of likes" },
        { id: 4, value: "postid" },
        { id: 5, value: "userid" },
        { id: 6, value: "delete" }
    ]
    const [allComments, setAllComments] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useSelector(state => state.auth.data);
    axios.defaults.withCredentials = true;
    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        try { 
            const getUser = async () => {
                try {
                    setLoading(true)
                    const { data } = await axios.get(`${BaseURL}/comment/comments`, {
                        cancelToken: cancelToken.token
                    })
                    setAllComments(data?.data?.comments)
                    setLoading(false)
                    if (data?.data?.comments?.length >= 9) {
                        setShowMore(true)
                    }
                } catch (error) {
                    console.log(error);
                    setLoading(false)
                    setError(error.message)
                }
            }
            getUser()
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log("cancelled");
            } else {
                setError(error?.response?.data?.message);
                setLoading(false)
                console.log(error);
            }
        }
        return () => {
            cancelToken.cancel()
        }
    }, [user?.isAdmin]);

    // handleShowMore 
    const handleShowMore = async () => {
        setShowMore(false)
        const startIndex = allComments.length + 1;
        try { 
            const { data } = await axios.get(`${BaseURL}/comment/comments?${user?._id}&startIndex=${startIndex}` )
            setAllComments(prev => [...prev, ...data?.data?.comments]); 
        } catch (error) {
            console.log(error?.response?.data?.message);
        }
    }
    if (loading) {
        return <Loader/>
    }
    if (error) {
        return error
    }
    return (
        <>
            <section className="w-full overflow-x-auto md:-mt-9">
                {
                    allComments?.length === 0 ? (<p className="text-center font-semibold">You have no commnets yet !</p>) :
                        (
                            <table className="w-full dark:bg-slate-800 bg-slate-200 rounded-lg overflow-hidden">
                                <thead className="dark:bg-slate-700 bg-slate-300">
                                    <tr >
                                        {
                                            tHeadData?.map(item => {
                                                return <th key={item?.id} className="p-2 text-[16px] uppercase dark:text-slate-300 text-left tracking-wide">{item?.value}</th>
                                            })
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allComments?.map(item => {
                                            return <TableCommentsBody data={item} setAllComments={setAllComments} key={item?._id} />
                                        })
                                    }
                                </tbody>
                            </table>
                        )
                }

                {
                    showMore && (
                        <button onClick={handleShowMore} className="w-full text-teal-500 py-2">Show More</button>
                    )
                }
            </section>
        </>)
}