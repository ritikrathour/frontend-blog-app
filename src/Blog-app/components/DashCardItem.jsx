
const DashCardItem = ({card ,totalUsers})=>{ 
    return (
        <> 
        <li className="dark:shadow-slate-800 flex gap-4 p-4 dark:shadow shadow-2xl min-w-[280px] justify-between rounded-md">
            <div>
                <h3 className="text-xl uppercase font-semibold my-1">{card?.text}</h3>
                <p className="text-2xl font-bold mb-3">{totalUsers}</p>
                <p className="text-sm"><span className="text-green-500 text-[12px]"><i className="fas fa-arrow-up  "/> 6</span> Last month</p>
            </div>
            <p className={`w-[35px] h-[35px] rounded-full ${card?.bg} text-center leading-[35px]`}><i className={`fas ${card?.icon} text-white`}></i></p>
        </li>
        </>
    )
}
export default DashCardItem