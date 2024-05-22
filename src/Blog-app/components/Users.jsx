import axios from "axios";
import { useEffect, useState } from "react";
import { BaseURL } from "../constants";
import { useSelector } from "react-redux";
import TableUserBody from "./TableUserBody"; 
import Loader from "./Loader"
const Users = () => {
    const tHeadData = [
        { id: 1, value: "Data Created" },
        { id: 2, value: "user image" },
        { id: 3, value: "user name" },
        { id: 4, value: "email" },
        { id: 5, value: "admin" },
        { id: 6, value: "delete" },
        { id: 7, value: "edit" },
    ]
    const [showMore, setShowMore] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const { user } = useSelector(state => state.auth.data);
    axios.defaults.withCredentials = true;
    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        try { 
            const getUser = async () => {
                try {
                    setLoading(true)
                    const { data } = await axios.get(`${BaseURL}/user/users`, {
                        cancelToken: cancelToken.token
                    }) 
                    setAllUsers(data?.data?.users)
                    setLoading(false)
                    if (data?.data?.users?.length >= 9) {
                        setShowMore(true) 
                    }
                } catch (error) {
                    console.log(error);
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
        const startIndex = allUsers.length + 1;
        try {
            const { data } = await axios.get(`${BaseURL}/user/users?${user?._id}&startIndex=${startIndex}`)
            setAllUsers(prev => [...prev, ...data?.data?.users])
        } catch (error) {
            console.log(error?.response?.data?.message);
        }
    }
    if (loading) {
        return  <Loader/>
    }
    return (
        <>
            <section className="w-full overflow-x-auto md:-mt-9">
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
                            allUsers?.map(item => {
                                return <TableUserBody data={item} setAllUser={setAllUsers} key={item?._id} user={user} />
                            })
                        }
                    </tbody>
                </table> 
                {
                    showMore && (
                        <button onClick={handleShowMore} className="w-full text-teal-500 py-2">Show More</button>
                    )
                }
            </section>
        </>
    )
}
export default Users;