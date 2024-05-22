import { Link } from "react-router-dom";

const NotFind = () => {
    return (
        <>
        <section className="h-screen flex justify-center items-center ">
            <div>  
            <h1>404 Error Page #3</h1> 
            <section className="error-container">
                <span>4</span>
                <span><span className="screen-reader-text">0</span></span>
                <span>4</span>
            </section>
            <div className="link-container">
                <Link to="/" className="more-link">Visit the original article</Link>
            </div> 
            </div>
            </section>
        </>
    )
}
export default NotFind;