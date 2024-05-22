
import axios from "axios";
import { BaseURL } from "../constants"; 
import { Link } from "react-router-dom";
import LazyImage from "./LazyImage";
axios.defaults.withCredentials = true;
const TableUserBody = ({ data, setAllUser }) => {
   const handleDelete = async (id) => {
      try { 
         await axios.delete(`${BaseURL}/user/singleUser-delete/${id}` );
         setAllUser((prev) => prev.filter((user) => user?._id !== id))
      } catch (error) {
         console.log(error);
      }
   }
  
   return (
      <>
         <tr className="px-3 dark:hover:bg-slate-700 hover:bg-slate-300 transition-all">
            <td className="dark:text-slate-400 text-slate-900 p-2">{new Date(data?.updatedAt).toLocaleDateString()}</td>
            <td className="p-2">
               <div className="w-[80px] h-[40px] object-cover rounded-md">
               <LazyImage src={data?.avatar} alt="postImage"/>
               </div>
            </td>
            <td className="font-semibold p-2 capitalize">
               {data?.userName}
            </td>
            <td className="dark:text-slate-400 text-slate-900 p-2">{data?.email}</td>
            <td className="dark:text-slate-400 text-slate-900 p-2">{data?.isAdmin ? (<i className="fas fa-check text-green-500" />) : (<i className="fas fa-times text-red-600" />)}</td>
            <td className="text-red-600 font-medium cursor-pointer p-2 hover:underline"
               onClick={() => { handleDelete(data?._id) }}>Delete</td>
            <td className="text-green-500 font-medium cursor-pointer p-2 hover:underline">
               <Link to={`/edit-user-role/${data?._id}`}>
               Edit
               </Link>
            </td>
         </tr>

      </>
   )
}
export default TableUserBody;