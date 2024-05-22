import axios from "axios";
import moment from "moment"
import { useEffect, useState } from "react";
import { BaseURL } from "../constants";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LazyImage from "./LazyImage";
const PostComment = ({ comment, handleLike, handleDeleteComment, onEdit }) => {
    const { data } = useSelector(state => state?.auth)
    const [Editing, setEditing] = useState(false)
    const [commentUser, setCommentUser] = useState(null);
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        ; (async () => {
            try {
                const { data } = await axios.get(`${BaseURL}/user/get-user/${comment?.userId}`)
                setCommentUser(data?.data);
            } catch (error) {
                console.log(error);
            }
        })();

        return () => {
            cancelToken.cancel()
        }
    }, []);
    // handle Editing
    const handleIsEditing = () => {
        setEditing(true)
    }
    // handleEditComment 
    const handleEditCommentSave = async () => {
        try { 
            await axios.patch(`${BaseURL}/comment/edit-comment/${comment?._id}`, { content } );
            setEditing(false);
            onEdit(comment, content)
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className="flex gap-4 items-center border-b py-2 dark:border-slate-700">
                <div className="max-w-[40px] h-[40px] overflow-hidden rounded-full"> 
                    <LazyImage src={commentUser?.avatar || "../images/avatar.png"} alt="commented-user" />
                </div>
                <div className="flex flex-col w-full">
                    <p className="font-bold text-sm" >{commentUser?.userName} <span className="text-[10px] font-normal">{moment(comment?.createdAt).fromNow()}</span></p>
                    {
                        Editing ? (
                            <>
                                <div className="h-[100px]">
                                    <textarea value={content}
                                        onChange={(e) => setContent(e.target.value)} className="w-full text-black h-full resize-none rounded-lg p-2" />
                                </div>
                                <div className="flex justify-end gap-4 my-2 items-center">
                                    <button className="py-1 px-3 bg-green-600 rounded-md text-sm" onClick={handleEditCommentSave}>Save</button>
                                    <button className="py-1 px-3 bg-red-600 rounded-md text-sm" onClick={() => setEditing(false)}>Cancel</button>
                                </div>
                            </>
                        ) : (
                            <> 
                                <p className="text-[12px]">{comment?.content}</p>
                                <div className="flex items-center gap-2 pt-1">
                                    <p className={`flex gap-2 items-center ${comment?.likes?.includes(data?.user?._id) && "text-blue-500"}`}>
                                        <i className={`fas fa-thumbs-up cursor-pointer ${!data?.user ? "pointer-none" : ""}`}
                                            onClick={() => !data?.user ? navigate("/sign-in") : handleLike(comment?._id)} />
                                        <span className="text-sm">
                                            {
                                                comment?.numberOfLikes > 0 ? comment?.numberOfLikes : ""
                                            }
                                            {" "}
                                            {
                                                (comment?.numberOfLikes === 0) && ""
                                            }
                                            {
                                                comment.numberOfLikes === 1 && "Like"
                                            }
                                            {
                                                comment.numberOfLikes > 1 && "Like"
                                            }
                                        </span>
                                    </p>
                                    {
                                        data?.user?.userName === commentUser?.userName ?
                                            <>
                                                <p className="cursor-pointer text-sm" onClick={() => {
                                                    handleIsEditing(comment?._id)
                                                    setContent(comment?.content)
                                                }
                                                }>Edit</p>
                                                <p className="cursor-pointer text-sm text-red-400 hover:underline transition-all" onClick={() => handleDeleteComment(comment?._id)}>Delete</p>
                                            </>
                                            : ""
                                    }
                                </div></>
                        )
                    }
                </div>
            </div>
        </>
    )
}
export default PostComment;