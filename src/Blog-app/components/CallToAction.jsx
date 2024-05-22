import LazyImage from "./LazyImage";

const CallToAction = () => {
    return (
        <>
            <div className="flex justify-around items-center rounded-b-2xl flex-wrap gap-4 py-12 bg-slate-300 dark:bg-gray-800 p-2">
                <div className="text-center ">
                    <h3 className="font-medium leading-5 mb-2">Want to learn HTML,CSS and JavaScript by Building fun and <br /> engaging projects?</h3>
                    <p className="text-[12px] text-slate-600 dark:text-slate-400 mb-2">Check our 100 js project website and start building your own projects </p>
                    <button className="py-1 px-4 w-full text-white bg-gradient-to-r from-purple-600 to-sky-400 rounded-md">
                        100 JS Projects website
                    </button>
                </div>
                <div className="w-[500px] h-[290px]"> 
                        <LazyImage src={"../images/images.jfif" || "./images/fallback.png"} alt="CTA-View"/>
                </div>
            </div>
        </>
    )
}
export default CallToAction;