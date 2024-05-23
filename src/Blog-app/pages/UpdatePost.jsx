import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { BaseURL } from "../constants/index"
import axios from "axios";
import useFetchApi from "../Hooks/useFetchApi";
import LazyImage from "../components/LazyImage";
import Loader from "../components/Loader"
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import uploadFile from "../helper/UploadPhoto";
axios.defaults.withCredentials = true;
const UpdatePost = () => {
    const navigate = useNavigate()
    const { postId } = useParams()
    const [updatepostSuccess, setUpdatePostSuccess] = useState("");
    const [updatepostLoading, setUpdatePostLoading] = useState(false)
    const [uploadpostImageLoading, setUploadpostImageLoading] = useState(false)
    const [updatepostError, setUpdatePostError] = useState("");
    const [formData, setFormData] = useState({})
    const { data, loading } = useFetchApi(`post/posts?postId=${postId}`); 
    // handleUploadPhoto
    const handleUploadPhoto = async (e) => {
        try {
            setUploadpostImageLoading(true)
            const file = e.target?.files[0]
            const uploadPhoto = await uploadFile(file);
            setFormData((preve) => {
                return {
                    ...preve,
                    image: uploadPhoto?.url
                }
            })
            setUploadpostImageLoading(false)
        } catch (error) {
            setUploadpostImageLoading(false)
        }
        finally {
            setUploadpostImageLoading(false)
        }
    }
    // create post  
    const handleupdatePost = async (e) => { 
        e.preventDefault();
        try {
            setUpdatePostLoading(true)
            const response = await axios.patch(`${BaseURL}/post/posts/${postId}/${data?.posts[0]?.userId}`, formData)
            setUpdatePostError("");
            console.log(response);
            setUpdatePostSuccess(response?.data?.message);
            setUpdatePostLoading(false)
            setFormData({
                title: "",
                category: "",
                textArea: "",
            })
            setTimeout(() => {
                navigate(`/`)
            }, 1000);
        } catch (error) {
            setUpdatePostLoading(false)
            console.log(error);
            setUpdatePostError(error?.response?.data?.message)
            setUpdatePostSuccess("")
        }
    }
    return (
        <>
            <section className="my-5 py-4 flex justify-center items-center flex-col gap-2">
                <h2 className="text-2xl font-bold">Update post</h2>
                <form action="" onSubmit={(e) => handleupdatePost(e)}>
                    <div className="w-full md:w-[700px]  p-2">
                        <div className="flex justify-between items-center gap-4 flex-wrap mb-4">
                            <div className="textfield w-[300px]">
                                <input type="text" onChange={(e) => setFormData({ ...formData, title: e.target?.value })} defaultValue={data?.posts && data?.posts[0]?.title} placeholder="Title" name="title" className="px-2 text-slate-700 border-2 dark:border-green-400 rounded-md
                             focus:bg-slate-100 h-[40px] w-full dark:bg-slate-700 dark:text-slate-200 border-slate-300" />
                            </div>
                            <select name="category" onChange={(e) => setFormData({ ...formData, category: e.target?.value })} defaultValue={data?.posts && data?.posts[0]?.category} className="px-2 text-slate-700 outline-none rounded-md
                             focus:bg-slate-300 bg-slate-100 h-[40px] dark:bg-slate-700 dark:text-slate-300">
                                <option value="Select Option">Select Option</option>
                                <option value="JavaScript">JavaScript</option>
                                <option value="React">React</option>
                                <option value="HTML-CSS">HTML-CSS</option>
                                <option value="Phyton">Phyton</option>
                                <option value="Express">Express</option>
                                <option value="Node.js">Node.js</option>
                                <option value="MongoDb">MongoDb</option>
                            </select>
                        </div>
                            <label htmlFor="image">Update Image</label>
                        <div className="mt-2 border-2 border-dashed p-1 dark:border-green-400 border-slate-300">
                            <input id="image" type="file" className="p-2 w-full text-slate-700 outline-none rounded-md
                             focus:bg-slate-100 dark:bg-slate-700 dark:text-slate-200" onChange={handleUploadPhoto} />
                        </div>
                        {
                            loading ? (
                                <div className="flex justify-center items-center gap-2">
                                    <p>Image Loading...</p>
                                    <Loader />
                                </div>
                            ) : (
                                uploadpostImageLoading ? (<p className="text-center my-2">Image Uploading...</p>) : (
                                    < div className="img-box rounded-lg overflow-hidden my-4 ">
                                        <LazyImage src={formData?.image || data?.posts && data?.posts[0]?.image} alt={data?.posts && data?.posts[0]?.title} />
                                    </div>
                                )
                            )
                        }

                        {formData?.imageFile &&
                            <div className="imagePreview my-4">
                                <img src={formData?.imageFile} alt="file" />
                            </div>}
                        <div className="w-full my-2">
                            <ReactQuill onChange={(value) => {
                                setFormData({ ...formData, content: value });
                            }} value={formData.content || data?.posts && data?.posts[0]?.content} theme="snow" placeholder="Write something" className="h-72 mb-10 text-black dark:text-white text-xl" />
                        </div>
                    </div>
                    <div className=" p-1 w-full">
                        <button disabled={updatepostLoading} type="submit" className=" bg-gradient-to-bl to-pink-500 from-yellow-400 bg-slate-800 w-full py-2 text-white rounded-lg">{updatepostLoading ? "Loading..." : "UpdatePost"}</button>
                    </div>
                    <p className={`${updatepostSuccess ? "bg-green-300 text-slate-700" : "bg-red-500 text-slate-100"} mt-2 rounded-md text-center self-center leading-10`}>
                        {updatepostSuccess ? updatepostSuccess : updatepostError}
                    </p>
                </form>
            </section >
        </>
    )
}
export default UpdatePost;
