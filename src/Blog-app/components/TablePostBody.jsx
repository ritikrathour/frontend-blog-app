import axios from "axios"
import { BaseURL } from "../constants"
import { Link } from "react-router-dom";
import LazyImage from "./LazyImage";
axios.defaults.withCredentials = true;
const TablePostBody = ({ data, user, setPost }) => {   
   const handleDeletePost = async (id) => {
      try {  
         await axios.delete(`${BaseURL}/post/posts/${id}/${user?._id}`);
         setPost((prev) => prev.filter((post) => post?._id !== id))
      } catch (error) {
         console.log(error);
      }
   } 
   return (
      <>
         <tr className="px-3 dark:hover:bg-slate-700 hover:bg-slate-300 transition-all">
            <td className="dark:text-slate-400 text-slate-900 p-2">{new Date(data?.updatedAt).toLocaleDateString()}</td>
            <td className="p-2">
               <Link to={`/post/${data?.slug}`}>
                  <div className="w-[80px] h-[40px] object-cover rounded-md overflow-hidden">
                  <LazyImage src={data?.image} alt="postImage"/>
                  </div> 
               </Link>
            </td>
            <td className="font-semibold p-2">
               <Link to={`/post/${data?.slug}`}>
               {data?.title}
               </Link>
            </td>
            <td className="dark:text-slate-400 text-slate-900 p-2">{data?.category}</td>
            <td className="text-red-600 font-medium cursor-pointer p-2 hover:underline" 
            onClick={() => { handleDeletePost(data?._id) }}>Delete</td>
            <td className="text-green-500 font-medium cursor-pointer p-2 hover:underline">
               <Link to={`/update-post/${data?._id}`}>
                  Edit
               </Link>
            </td>
         </tr>

      </>
   )
}
export default TablePostBody;