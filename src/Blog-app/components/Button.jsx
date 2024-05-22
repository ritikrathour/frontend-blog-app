import { Link } from "react-router-dom";

const Button = ({text,endpoint}) => {
    return (
        <div className="p-0.5 w-full bg-gradient-to-r from-purple-600 to-sky-400 rounded-lg">
            <Link to={endpoint?endpoint:"#"} className='inline-block py-1 px-4 text-slate-800 w-full text-center bg-white rounded-lg transition-all hover:bg-gradient-to-r from-purple-600 to-sky-400 hover:text-white font-semibold'>{text}</Link>
        </div>
    )
}
export default Button;