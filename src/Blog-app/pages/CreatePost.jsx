import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { BaseURL } from "../constants/index"
import axios from "axios";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import uploadFile from "../helper/UploadPhoto";
import LazyImage from "../components/LazyImage"
const CreatePost = () => {
    const navigate = useNavigate()
    const [postSuccess, setPostSuccess] = useState("");
    const [postLoading, setPostLoading] = useState(false);
    const [uploadpostImageLoading, setUploadpostImageLoading] = useState(false)
    const [postError, setPostError] = useState("");

    const [formData, setFormData] = useState({
        title: "",
        category: "",
        content: "",
        blogPostImg: ""
    }) 
    // handleChange 
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    // handleUploadPhoto
    const handleUploadPhoto = async (e) => {
        try {
            setUploadpostImageLoading(true)
            const file = e.target?.files[0]
            const uploadPhoto = await uploadFile(file);
            setFormData((preve) => {
                return {
                    ...preve,
                    blogPostImg: uploadPhoto?.url
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
    const handleCreatePost = async (e) => {
        e.preventDefault();
        if (!formData?.title && !formData?.content && formData?.title === "" && formData?.content === "") {
            return setPostError("All Fields are required..")
        }
        try {
            setPostLoading(true)
            const response = await axios.post(`${BaseURL}/post/create-post`, formData, { withCredentials: true })
            setPostError("");
            setPostSuccess(response?.data?.message);
            setPostLoading(false)
            setFormData({
                title: "",
                category: "",
                content: "",
            })
            setTimeout(() => {
                navigate(`/`)
            }, 1000);
        } catch (error) {
            setPostLoading(false)
            console.log(error);
            setPostError(error?.response?.data?.message)
            setPostSuccess("")
        }
    }
    return (
        <>
            <section className="my-5 py-4 flex justify-center items-center flex-col gap-2">
                <h2 className="text-2xl font-bold">Create post</h2>
                <form action="" onSubmit={(e) => handleCreatePost(e)}>
                    <div className="w-full md:w-[700px]  p-2">
                        <div className="flex justify-between items-center gap-4 flex-wrap">
                            <div className="textfield w-[300px]">
                                <input type="text" onChange={(e) => handleChange(e)} value={formData.title} placeholder="Title" name="title" className="px-2 text-slate-700 border-2 dark:border-green-400 rounded-md
                             focus:bg-slate-100 h-[40px] w-full dark:bg-slate-700 dark:text-slate-200 border-slate-300" />
                            </div>
                            <select name="category" onChange={(e) => handleChange(e)} value={formData.category} className="px-2 text-slate-700 outline-none rounded-md
                             focus:bg-slate-300 bg-slate-100 h-[40px] dark:bg-slate-700 dark:text-slate-300">
                                <option defaultValue="Choose Option">Choose Option</option>
                                <option value="JavaScript">JavaScript</option>
                                <option value="React">React</option>
                                <option value="HTML-CSS">HTML-CSS</option>
                                <option value="Phyton">Phyton</option>
                                <option value="Express">Express</option>
                                <option value="Node.js">Node.js</option>
                                <option value="MongoDb">MongoDb</option>
                            </select>
                        </div>
                        <div className="flex justify-between flex-wrap gap-2 items-center mt-5 border-2 border-dashed p-1 dark:border-green-400 border-slate-300">
                            <input type="file" onChange={handleUploadPhoto} accept="image/*" name="blogPostImg" className="p-2 w-full text-slate-700 outline-none rounded-md
                             focus:bg-slate-100 dark:bg-slate-700 dark:text-slate-200"/> 
                        </div>
                        {
                            uploadpostImageLoading ? (
                               <div className="flex items-center justify-center my-2 gap-1">Uploading<div className="lds-hourglass"></div></div> 
                            ) : 
                            (
                                formData?.blogPostImg &&
                                <div className="imagePreview rounded-lg overflow-hidden my-4 w-full h-[400px]">
                                    <LazyImage src={formData?.blogPostImg} alt="file" /> 
                                </div>
                            )
                        }
                        <div className="w-full my-2">
                            <ReactQuill onChange={(value) => setFormData({ ...formData, content: value })} theme="snow" placeholder="Write something" className="h-72 mb-10 text-black dark:text-white text-xl" />
                        </div>
                    </div>
                    <div className=" p-1 w-full">
                        <button disabled={postLoading} type="submit" className=" bg-gradient-to-bl to-pink-500 from-yellow-400 bg-slate-800 w-full py-2 text-white rounded-lg">{postLoading ? "Loading..." : "Publish"}</button>
                    </div>
                    <p className={`${postSuccess ? "bg-green-300 text-slate-700" : "bg-red-500 text-slate-100"} mt-2 rounded-md text-center self-center leading-10`}>
                        {postSuccess ? postSuccess : postError}
                    </p>
                </form>
            </section>
        </>
    )
}
export default CreatePost;