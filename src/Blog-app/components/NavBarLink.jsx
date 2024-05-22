import { Link } from "react-router-dom";


const NavBarLink = ({data,func}) => {
    return (
        <Link to={data?.path} onClick={func}>
            <li className="hover:bg-slate-100 dark:hover:bg-slate-700 transition-all p-1 rounded-md">
               {data?.link}
            </li>
        </Link>
    )
}
export default NavBarLink;