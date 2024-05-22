 

const CTA = ({text}) => {
    return (
        <> 
        <button className="font-bold text-[24px] mb-3">
            <span className="inline-block bg-gradient-to-bl to-pink-500 from-yellow-400 rounded-[6px] px-1 text-white">M24's</span>Blog
        </button >
        <p className="leading-4 font-semibold text-[14px]">
            This is a demo project. You can {text} with your email, <br className="hidden md:block"/> userName and password.</p>
        </>
    )
}
export default CTA;