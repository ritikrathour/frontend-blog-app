import { Link } from "react-router-dom";

const Footer = () => {
    return ( <>
   
        <div className="border-b border-slate-400 flex flex-wrap gap-5 justify-between pb-4">
            < Link to={"/"} className="font-bold text-[18px]">
                <span className="inline-block bg-gradient-to-bl to-pink-500 from-yellow-400 rounded-[6px] px-1 text-white">M24's</span>Blog
            </Link>
            <div className="flex flex-wrap gap-8 mt-4 md:mt-0">
                <ul className="grid gap-2">
                    <h3 className="mb-2 text-[16px] font-semibold">About</h3>
                    <li className="text-[14px] text-left">100 JS Project</li>
                    <li className="text-[14px] text-left">Ritik's Blog</li>
                </ul>
                <ul className="grid gap-2">
                    <h3 className="mb-2 text-[16px] font-semibold">Follow Me</h3>
                    <li className="text-[14px] text-left">GitHub</li>
                    <li className="text-[14px] text-left">LinkedIn</li>
                </ul>
                <ul className="grid gap-2">
                    <h3 className="mb-2 text-[16px] font-semibold">Legal</h3>
                    <li className="text-[14px] text-left">Privecy Policy</li>
                    <li className="text-[14px] text-left">Tems & Conditions</li>
                </ul>
            </div>
        </div> 
        <div className="flex justify-between items-center py-4">
            <p className="text-[12px]">c 2024 Ritik's Blog</p>
            <ul className="flex gap-2">
                <li><i className="fab fa-linkedin"></i></li>
                <li><i className="fab fa-instagram"></i></li>
                <li><i className="fab fa-facebook"></i></li>
                <li><i className="fab fa-github"></i></li>
                <li><i className="fab fa-twitter"></i></li>
            </ul>
        </div>
        </>
    )
}
export default Footer;