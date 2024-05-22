import { Link } from "react-router-dom";
import LazyImage from "./LazyImage";
const PostCard = ({ posts }) => {  
    return (
        <>
            <Link to={`/post/${posts?.slug}`}>
                <div className="rounded-md border border-slate-500 hover:scale-95 transition-all">
                    <div className="sm:w-[300px]  lg:w-[400px] h-[200px] overflow-hidden rounded-md">
                        <LazyImage src={posts?.image} alt={posts?.slug} /> 
                    </div>
                    <div className="p-4">
                        <h3 className="capitalize">{posts?.title}</h3>
                        <p>{posts?.category || "uncategorized"}</p>
                    </div>
                </div>
            </Link>
        </>
    )
}
export default PostCard;