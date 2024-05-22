import useFetchApi from "../Hooks/useFetchApi";
import PostCard from "../components/PostCard";
const BlogPosts = () => {
    const { data, loading, error } = useFetchApi(`post/posts?limit=50`);   
    if(error){
        return error
    }
    return (
        <>
            <section className="my-5 h-full">
                <h2 className="text-2xl ml-2">All Posts</h2>
                <div className="flex my-6 flex-wrap gap-4 justify-center items-center">
                    {
                        loading ? ("Loading...") : (
                            data?.posts?.map(post => {
                                return <PostCard posts={post} key={post?._id} />
                            })
                        )
                    }
                </div>
            </section>
        </>
    )
}
export default BlogPosts;